/**
 * Configuration for production builds
 * Used during npm build and deployment
 */

// This is a placeholder for any build configuration
// For Node.js/Express, the app works as-is without build process

export default {
  // Environment-specific settings
  production: {
    PORT: process.env.PORT || 8000,
    NODE_ENV: 'production',
    CORS_ORIGIN: process.env.CORS_ORIGIN || '*'
  },
  
  development: {
    PORT: 8000,
    NODE_ENV: 'development',
    CORS_ORIGIN: 'http://localhost:5173,http://localhost:3000'
  },

  // Algorithm constraints
  constraints: {
    MIN_BOARD_SIZE: 4,
    MAX_BOARD_SIZE: 20,
    MAX_ITERATIONS: 10000,
    MAX_RESTARTS: 500
  },

  // Performance settings
  performance: {
    MAX_STEPS_IN_RESPONSE: 500,
    MAX_RESPONSE_SIZE: '10mb'
  }
};
