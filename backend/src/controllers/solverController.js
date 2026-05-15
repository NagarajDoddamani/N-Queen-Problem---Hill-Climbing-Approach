/**
 * Controller for N-Queens solver routes
 * Handles HTTP requests and responses
 */

import {
  solveNQueens,
  calculateHeuristic,
  generateBoard,
  compareAlgorithms,
  getAlgorithmInfo
} from '../services/solverService.js';

/**
 * Health check endpoint
 */
export const healthCheck = (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'N-Queens Solver API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
};

/**
 * Solves N-Queens problem
 * POST /api/solve
 * Body: { n, algorithm, maxIterations, maxRestarts }
 */
export const solveProblem = (req, res) => {
  try {
    const { n, algorithm, maxIterations, maxRestarts } = req.body;

    // Validate required fields
    if (n === undefined) {
      return res.status(400).json({
        error: 'Missing required field: n',
        statusCode: 400
      });
    }

    // Validate n
    if (!Number.isInteger(n) || n < 4 || n > 20) {
      return res.status(400).json({
        error: 'Invalid board size. Must be an integer between 4 and 20.',
        statusCode: 400
      });
    }

    const solution = solveNQueens({
      n,
      algorithm: algorithm || 'hillClimbingWithRandomRestart',
      maxIterations: maxIterations || 1000,
      maxRestarts: maxRestarts || 100
    });

    return res.status(200).json(solution);
  } catch (error) {
    console.error('Error solving N-Queens:', error);
    return res.status(500).json({
      error: error.message,
      statusCode: 500
    });
  }
};

/**
 * Calculates heuristic value for a board state
 * POST /api/heuristic
 * Body: { board, heuristicType }
 */
export const calculateHeuristicValue = (req, res) => {
  try {
    const { board, heuristicType } = req.body;

    // Validate required fields
    if (!Array.isArray(board)) {
      return res.status(400).json({
        error: 'Invalid board format. Expected an array.',
        statusCode: 400
      });
    }

    if (board.length < 4 || board.length > 20) {
      return res.status(400).json({
        error: 'Invalid board size. Must be between 4 and 20.',
        statusCode: 400
      });
    }

    const heuristic = calculateHeuristic({
      board,
      heuristicType: heuristicType || 'conflicts'
    });

    return res.status(200).json(heuristic);
  } catch (error) {
    console.error('Error calculating heuristic:', error);
    return res.status(500).json({
      error: error.message,
      statusCode: 500
    });
  }
};

/**
 * Generates a random board state
 * GET /api/generate/:n
 * Params: n (board size)
 */
export const generateRandomBoard = (req, res) => {
  try {
    const { n } = req.params;
    const boardSize = parseInt(n, 10);

    // Validate board size
    if (!Number.isInteger(boardSize) || boardSize < 4 || boardSize > 20) {
      return res.status(400).json({
        error: 'Invalid board size. Must be an integer between 4 and 20.',
        statusCode: 400
      });
    }

    const board = generateBoard(boardSize);

    return res.status(200).json(board);
  } catch (error) {
    console.error('Error generating board:', error);
    return res.status(500).json({
      error: error.message,
      statusCode: 500
    });
  }
};

/**
 * Compares multiple algorithms
 * GET /api/compare/:n
 * Params: n (board size)
 */
export const compareAlgorithmsHandler = (req, res) => {
  try {
    const { n } = req.params;
    const boardSize = parseInt(n, 10);

    // Validate board size
    if (!Number.isInteger(boardSize) || boardSize < 4 || boardSize > 15) {
      return res.status(400).json({
        error: 'Invalid board size. Must be an integer between 4 and 15 for comparison.',
        statusCode: 400
      });
    }

    const comparison = compareAlgorithms(boardSize);

    return res.status(200).json(comparison);
  } catch (error) {
    console.error('Error comparing algorithms:', error);
    return res.status(500).json({
      error: error.message,
      statusCode: 500
    });
  }
};

/**
 * Gets algorithm information and documentation
 * GET /api/algorithms
 */
export const getAlgorithms = (req, res) => {
  try {
    const info = getAlgorithmInfo();
    return res.status(200).json(info);
  } catch (error) {
    console.error('Error getting algorithm info:', error);
    return res.status(500).json({
      error: error.message,
      statusCode: 500
    });
  }
};

/**
 * Batch solve - solves multiple board sizes
 * POST /api/batch-solve
 * Body: { sizes: [8, 10, 12], algorithm: 'hillClimbingWithRandomRestart' }
 */
export const batchSolve = (req, res) => {
  try {
    const { sizes, algorithm } = req.body;

    // Validate input
    if (!Array.isArray(sizes) || sizes.length === 0) {
      return res.status(400).json({
        error: 'Invalid sizes format. Expected a non-empty array.',
        statusCode: 400
      });
    }

    if (sizes.some(n => !Number.isInteger(n) || n < 4 || n > 20)) {
      return res.status(400).json({
        error: 'All board sizes must be integers between 4 and 20.',
        statusCode: 400
      });
    }

    const results = sizes.map(n => {
      try {
        return solveNQueens({
          n,
          algorithm: algorithm || 'hillClimbingWithRandomRestart',
          maxIterations: 1000,
          maxRestarts: 100
        });
      } catch (error) {
        return {
          boardSize: n,
          error: error.message
        };
      }
    });

    return res.status(200).json({
      batchSize: sizes.length,
      results,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in batch solve:', error);
    return res.status(500).json({
      error: error.message,
      statusCode: 500
    });
  }
};
