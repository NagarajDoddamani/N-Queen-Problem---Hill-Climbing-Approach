/**
 * Express application setup and middleware configuration
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import solverRoutes from './routes/solverRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const API_PREFIX = process.env.API_PREFIX || '/api';
const CORS_ORIGIN = process.env.CORS_ORIGIN?.split(',') || [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8000'
];

// Middleware
// CORS Configuration
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use(API_PREFIX, solverRoutes);

// Health check root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'N-Queens Solver API',
    version: '1.0.0',
    status: 'running',
    apiPrefix: API_PREFIX,
    endpoints: [
      'GET  /health',
      'POST /solve',
      'POST /heuristic',
      'GET  /generate/:n',
      'GET  /compare/:n',
      'GET  /algorithms',
      'POST /batch-solve'
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
    statusCode: 404
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    statusCode: 500
  });
});

export default app;
