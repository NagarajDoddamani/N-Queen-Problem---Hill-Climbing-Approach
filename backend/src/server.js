/**
 * Server entry point
 * Starts the Express application
 */

import app from './app.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 8000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Start server
const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   N-Queens Solver API - Backend        ║
╚════════════════════════════════════════╝

📡 Server started successfully!
🌐 URL: http://localhost:${PORT}
📝 Environment: ${NODE_ENV}
🔌 API Prefix: /api

Available Endpoints:
  • GET  /api/health          - Health check
  • POST /api/solve           - Solve N-Queens problem
  • POST /api/heuristic       - Calculate heuristic value
  • GET  /api/generate/:n     - Generate random board
  • GET  /api/compare/:n      - Compare algorithms
  • GET  /api/algorithms      - Get algorithm information
  • POST /api/batch-solve     - Batch solve multiple boards

Ready to accept requests! 🚀
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

export default server;
