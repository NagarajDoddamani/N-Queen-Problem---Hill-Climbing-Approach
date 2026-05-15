/**
 * Hill Climbing Algorithm implementation for N-Queens problem
 */

import {
  generateRandomBoard,
  copyBoard,
  getRandomNeighbor
} from './boardGenerator.js';

import {
  calculateConflicts,
  isSolution
} from './heuristic.js';

/**
 * Basic Hill Climbing Algorithm
 * @param {number} n - Number of queens
 * @param {number} maxIterations - Maximum iterations before timeout
 * @returns {Object} Solution object with states and result
 */
export const basicHillClimbing = (n, maxIterations = 1000) => {
  const startTime = Date.now();
  const states = [];
  let current = generateRandomBoard(n);
  let currentCost = calculateConflicts(current);
  let iterations = 0;

  states.push({
    board: copyBoard(current),
    cost: currentCost,
    iteration: iterations,
    action: 'initial'
  });

  while (!isSolution(current) && iterations < maxIterations) {
    iterations++;
    const neighbor = getRandomNeighbor(current);
    const neighborCost = calculateConflicts(neighbor);

    // Hill climbing: move to neighbor only if it's better (lower cost)
    if (neighborCost < currentCost) {
      current = neighbor;
      currentCost = neighborCost;

      states.push({
        board: copyBoard(current),
        cost: currentCost,
        iteration: iterations,
        action: 'move'
      });
    }

    // If we reach a local maximum, we're stuck
    if (iterations > 0 && iterations % 100 === 0) {
      states.push({
        board: copyBoard(current),
        cost: currentCost,
        iteration: iterations,
        action: 'plateau'
      });
    }
  }

  const endTime = Date.now();
  const isSolved = isSolution(current);

  return {
    success: isSolved,
    solution: isSolved ? copyBoard(current) : null,
    finalCost: currentCost,
    iterations,
    executionTime: endTime - startTime,
    states,
    reason: isSolved ? 'solution_found' : 'max_iterations_reached'
  };
};

/**
 * Hill Climbing with Random Restart
 * Restarts the algorithm multiple times to escape local maxima
 * @param {number} n - Number of queens
 * @param {number} maxRestarts - Number of restart attempts
 * @param {number} maxIterationsPerRun - Max iterations per run
 * @returns {Object} Solution object with all runs
 */
export const hillClimbingWithRandomRestart = (
  n,
  maxRestarts = 100,
  maxIterationsPerRun = 1000
) => {
  const startTime = Date.now();
  let bestSolution = null;
  let bestCost = Infinity;
  const allRuns = [];
  let successfulRuns = 0;
  let totalIterations = 0;

  for (let restart = 0; restart < maxRestarts; restart++) {
    const result = basicHillClimbing(n, maxIterationsPerRun);
    totalIterations += result.iterations;

    allRuns.push({
      restart,
      iterations: result.iterations,
      finalCost: result.finalCost,
      success: result.success,
      executionTime: result.executionTime
    });

    if (result.success) {
      successfulRuns++;
      bestSolution = result.solution;
      bestCost = result.finalCost;
      // Found solution, can stop
      break;
    }

    // Keep track of best solution even if not complete
    if (result.finalCost < bestCost) {
      bestCost = result.finalCost;
      bestSolution = result.solution;
    }
  }

  const endTime = Date.now();

  return {
    success: bestSolution !== null && isSolution(bestSolution),
    solution: bestSolution,
    finalCost: bestCost,
    successfulRuns,
    totalRuns: allRuns.length,
    totalIterations,
    executionTime: endTime - startTime,
    runs: allRuns,
    averageIterationsPerRun: Math.round(totalIterations / allRuns.length)
  };
};

/**
 * Steepest Ascent Hill Climbing
 * Evaluates all neighbors and picks the best one
 * @param {number} n - Number of queens
 * @param {number} maxIterations - Maximum iterations
 * @returns {Object} Solution object
 */
export const steepestAscentHillClimbing = (n, maxIterations = 1000) => {
  const startTime = Date.now();
  const states = [];
  let current = generateRandomBoard(n);
  let currentCost = calculateConflicts(current);
  let iterations = 0;

  states.push({
    board: copyBoard(current),
    cost: currentCost,
    iteration: iterations,
    action: 'initial'
  });

  while (!isSolution(current) && iterations < maxIterations) {
    iterations++;

    let bestNeighbor = current;
    let bestCost = currentCost;
    let neighborCount = 0;

    // Generate all neighbors
    const n = current.length;
    for (let col = 0; col < n; col++) {
      for (let row = 0; row < n; row++) {
        if (current[col] === row) continue;

        const neighbor = copyBoard(current);
        neighbor[col] = row;
        const neighborCost = calculateConflicts(neighbor);
        neighborCount++;

        if (neighborCost < bestCost) {
          bestCost = neighborCost;
          bestNeighbor = neighbor;
        }
      }
    }

    // If we found a better neighbor, move to it
    if (bestCost < currentCost) {
      current = bestNeighbor;
      currentCost = bestCost;

      states.push({
        board: copyBoard(current),
        cost: currentCost,
        iteration: iterations,
        action: 'move',
        neighborsEvaluated: neighborCount
      });
    } else {
      // No better neighbor found, stuck at local maximum
      states.push({
        board: copyBoard(current),
        cost: currentCost,
        iteration: iterations,
        action: 'stuck',
        neighborsEvaluated: neighborCount
      });
      break;
    }
  }

  const endTime = Date.now();
  const isSolved = isSolution(current);

  return {
    success: isSolved,
    solution: isSolved ? copyBoard(current) : null,
    finalCost: currentCost,
    iterations,
    executionTime: endTime - startTime,
    states,
    reason: isSolved ? 'solution_found' : 'local_maximum_reached'
  };
};

/**
 * Simulated Annealing variant for N-Queens
 * Accepts worse moves with decreasing probability
 * @param {number} n - Number of queens
 * @param {number} maxIterations - Maximum iterations
 * @param {number} initialTemperature - Starting temperature
 * @returns {Object} Solution object
 */
export const simulatedAnnealingNQueens = (
  n,
  maxIterations = 10000,
  initialTemperature = 100
) => {
  const startTime = Date.now();
  const states = [];
  let current = generateRandomBoard(n);
  let currentCost = calculateConflicts(current);
  let best = copyBoard(current);
  let bestCost = currentCost;
  let iterations = 0;
  let temperature = initialTemperature;

  states.push({
    board: copyBoard(current),
    cost: currentCost,
    iteration: iterations,
    temperature,
    action: 'initial'
  });

  while (iterations < maxIterations && temperature > 0.001) {
    iterations++;

    // Cool down
    temperature *= 0.9999;

    const neighbor = getRandomNeighbor(current);
    const neighborCost = calculateConflicts(neighbor);
    const costDifference = neighborCost - currentCost;

    // Accept neighbor if better, or with probability based on temperature
    if (costDifference < 0 || Math.random() < Math.exp(-costDifference / temperature)) {
      current = neighbor;
      currentCost = neighborCost;

      if (currentCost < bestCost) {
        best = copyBoard(current);
        bestCost = currentCost;

        states.push({
          board: copyBoard(current),
          cost: currentCost,
          iteration: iterations,
          temperature,
          action: 'improvement'
        });
      }
    }

    if (iterations % 500 === 0) {
      states.push({
        board: copyBoard(current),
        cost: currentCost,
        iteration: iterations,
        temperature,
        action: 'checkpoint'
      });
    }
  }

  const endTime = Date.now();
  const isSolved = isSolution(best);

  return {
    success: isSolved,
    solution: isSolved ? best : null,
    finalCost: bestCost,
    iterations,
    executionTime: endTime - startTime,
    states: states.slice(0, 100), // Limit states for response size
    reason: isSolved ? 'solution_found' : 'max_iterations_reached'
  };
};
