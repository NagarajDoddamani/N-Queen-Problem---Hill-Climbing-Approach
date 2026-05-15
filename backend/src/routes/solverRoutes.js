/**
 * Routes for N-Queens solver API
 */

import express from 'express';
import {
  healthCheck,
  solveProblem,
  calculateHeuristicValue,
  generateRandomBoard,
  compareAlgorithmsHandler,
  getAlgorithms,
  batchSolve
} from '../controllers/solverController.js';

const router = express.Router();

/**
 * Health check
 * GET /api/health
 */
router.get('/health', healthCheck);

/**
 * Main solve endpoint
 * POST /api/solve
 * Body: { n, algorithm, maxIterations, maxRestarts }
 */
router.post('/solve', solveProblem);

/**
 * Calculate heuristic
 * POST /api/heuristic
 * Body: { board, heuristicType }
 */
router.post('/heuristic', calculateHeuristicValue);

/**
 * Generate random board
 * GET /api/generate/:n
 */
router.get('/generate/:n', generateRandomBoard);

/**
 * Compare algorithms
 * GET /api/compare/:n
 */
router.get('/compare/:n', compareAlgorithmsHandler);

/**
 * Get algorithm information
 * GET /api/algorithms
 */
router.get('/algorithms', getAlgorithms);

/**
 * Batch solve multiple board sizes
 * POST /api/batch-solve
 * Body: { sizes: [8, 10, 12], algorithm: 'algorithm_name' }
 */
router.post('/batch-solve', batchSolve);

export default router;
