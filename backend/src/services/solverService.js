/**
 * Service layer for N-Queens solver
 * Handles business logic and algorithm execution
 */

import {
  basicHillClimbing,
  hillClimbingWithRandomRestart,
  steepestAscentHillClimbing,
  simulatedAnnealingNQueens
} from '../utils/hillClimbing.js';

import {
  calculateConflicts,
  isSolution,
  getConflictDetails
} from '../utils/heuristic.js';

import {
  generateRandomBoard,
  copyBoard
} from '../utils/boardGenerator.js';

/**
 * Solves N-Queens problem using specified algorithm
 * @param {Object} config - Configuration object
 * @param {number} config.n - Board size (number of queens)
 * @param {string} config.algorithm - Algorithm type
 * @param {number} config.maxIterations - Max iterations (optional)
 * @param {number} config.maxRestarts - Max restarts for random restart (optional)
 * @returns {Object} Solution with metrics and visualization data
 */
export const solveNQueens = (config) => {
  const {
    n = 8,
    algorithm = 'hillClimbing',
    maxIterations = 1000,
    maxRestarts = 100
  } = config;

  // Validate input
  if (!Number.isInteger(n) || n < 4 || n > 20) {
    throw new Error('Invalid board size. Must be between 4 and 20.');
  }

  let result;

  // Execute selected algorithm
  switch (algorithm) {
    case 'basicHillClimbing':
      result = basicHillClimbing(n, maxIterations);
      break;

    case 'hillClimbingWithRandomRestart':
      result = hillClimbingWithRandomRestart(n, maxRestarts, maxIterations);
      break;

    case 'steepestAscent':
      result = steepestAscentHillClimbing(n, maxIterations);
      break;

    case 'simulatedAnnealing':
      result = simulatedAnnealingNQueens(n, maxIterations);
      break;

    default:
      throw new Error(`Unknown algorithm: ${algorithm}`);
  }

  // Format response for frontend
  return formatSolutionResponse(result, n, algorithm);
};

/**
 * Formats the raw algorithm result for API response
 * @param {Object} result - Raw algorithm result
 * @param {number} n - Board size
 * @param {string} algorithm - Algorithm used
 * @returns {Object} Formatted response
 */
const formatSolutionResponse = (result, n, algorithm) => {
  return {
    metadata: {
      boardSize: n,
      algorithm,
      timestamp: new Date().toISOString()
    },
    result: {
      solved: result.success,
      solution: result.solution ? formatBoard(result.solution) : null,
      metrics: {
        iterations: result.iterations || 0,
        finalCost: result.finalCost,
        executionTime: result.executionTime,
        reason: result.reason || 'completed'
      }
    },
    visualization: {
      steps: result.states ? result.states.slice(0, 500) : [], // Limit to 500 steps for performance
      stateCount: result.states ? result.states.length : 0
    },
    ...(result.successfulRuns && {
      statistics: {
        successfulRuns: result.successfulRuns,
        totalRuns: result.totalRuns,
        totalIterations: result.totalIterations,
        averageIterationsPerRun: result.averageIterationsPerRun
      }
    })
  };
};

/**
 * Calculates heuristic value for a given board state
 * @param {Object} config - Configuration
 * @param {Array<number>} config.board - Current board state
 * @param {string} config.heuristicType - Type of heuristic
 * @returns {Object} Heuristic information
 */
export const calculateHeuristic = (config) => {
  const { board, heuristicType = 'conflicts' } = config;

  // Validate board
  if (!Array.isArray(board) || board.length === 0) {
    throw new Error('Invalid board configuration');
  }

  const conflicts = calculateConflicts(board);
  const details = getConflictDetails(board);

  return {
    board: formatBoard(board),
    heuristic: {
      conflicts,
      safe: board.length - new Set(details.conflicts.flatMap(c => [c.queen1.col, c.queen2.col])).size,
      isSolution: isSolution(board)
    },
    conflictDetails: details,
    boardSize: board.length
  };
};

/**
 * Generates a random board state
 * @param {number} n - Board size
 * @returns {Object} Random board configuration
 */
export const generateBoard = (n) => {
  if (!Number.isInteger(n) || n < 4 || n > 20) {
    throw new Error('Invalid board size. Must be between 4 and 20.');
  }

  const board = generateRandomBoard(n);
  const conflicts = calculateConflicts(board);

  return {
    board: formatBoard(board),
    boardSize: n,
    initialConflicts: conflicts,
    timestamp: new Date().toISOString()
  };
};

/**
 * Formats board array into a more readable structure
 * @param {Array<number>} board - Board configuration
 * @returns {Array<Object>} Formatted board positions
 */
const formatBoard = (board) => {
  return board.map((row, col) => ({
    row,
    col,
    position: `${String.fromCharCode(97 + col)}${row + 1}` // Chessboard notation (a1, b2, etc)
  }));
};

/**
 * Compares multiple algorithms on the same problem
 * @param {number} n - Board size
 * @returns {Object} Comparison results
 */
export const compareAlgorithms = (n) => {
  if (!Number.isInteger(n) || n < 4 || n > 15) {
    throw new Error('Board size must be between 4 and 15 for comparison.');
  }

  const algorithms = [
    'basicHillClimbing',
    'steepestAscent',
    'hillClimbingWithRandomRestart',
    'simulatedAnnealing'
  ];

  const results = {};
  const startTime = Date.now();

  algorithms.forEach(algo => {
    try {
      results[algo] = solveNQueens({
        n,
        algorithm: algo,
        maxIterations: 1000,
        maxRestarts: 50
      });
    } catch (error) {
      results[algo] = {
        error: error.message,
        algorithm: algo
      };
    }
  });

  const executionTime = Date.now() - startTime;

  return {
    boardSize: n,
    comparison: results,
    totalExecutionTime: executionTime,
    timestamp: new Date().toISOString()
  };
};

/**
 * Gets algorithm statistics and information
 * @returns {Object} Algorithm information
 */
export const getAlgorithmInfo = () => {
  return {
    algorithms: [
      {
        name: 'basicHillClimbing',
        displayName: 'Hill Climbing (Random Moves)',
        description: 'Simple hill climbing using random neighbor selection. Can get stuck at local maxima.',
        pros: ['Fast', 'Simple'],
        cons: ['Gets stuck at local maxima', 'Low success rate for large N'],
        complexity: {
          time: 'O(iterations * N²)',
          space: 'O(N)'
        }
      },
      {
        name: 'steepestAscent',
        displayName: 'Steepest Ascent Hill Climbing',
        description: 'Evaluates all neighbors and moves to the best one. Still gets stuck at local maxima.',
        pros: ['Better convergence', 'Evaluates all options'],
        cons: ['Expensive neighbor evaluation', 'Still gets stuck at local maxima'],
        complexity: {
          time: 'O(iterations * N³)',
          space: 'O(N²)'
        }
      },
      {
        name: 'hillClimbingWithRandomRestart',
        displayName: 'Hill Climbing with Random Restart',
        description: 'Restarts the algorithm multiple times to escape local maxima and find solutions.',
        pros: ['High success rate', 'Finds solutions'],
        cons: ['Can be slow for large N', 'Many restarts needed'],
        complexity: {
          time: 'O(restarts * iterations * N²)',
          space: 'O(N)'
        }
      },
      {
        name: 'simulatedAnnealing',
        displayName: 'Simulated Annealing',
        description: 'Accepts worse moves with decreasing probability to escape local maxima.',
        pros: ['Probabilistic escape from local maxima', 'Good for large N'],
        cons: ['Slower convergence', 'Requires temperature tuning'],
        complexity: {
          time: 'O(iterations * N)',
          space: 'O(N)'
        }
      }
    ],
    nqueensProblem: {
      description: 'Place N queens on an N×N chessboard such that no two queens attack each other',
      constraints: [
        'No two queens can be in the same row',
        'No two queens can be in the same column',
        'No two queens can be in the same diagonal'
      ],
      difficulty: 'NP-Complete',
      knownSolutions: {
        4: 2,
        8: 92,
        12: 14200,
        16: 14772512
      }
    }
  };
};
