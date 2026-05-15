# N-Queen Problem Solver - Backend API

Complete backend API for the N-Queen Problem Solver using Hill Climbing Algorithm. Built with Node.js, Express.js, and ES6 modules.

## Overview

This backend provides RESTful APIs to solve the classic N-Queens problem using multiple hill climbing variants and other optimization algorithms. It's designed to work seamlessly with the React frontend and deploy on Render.

## Features

✅ **Multiple Algorithms**
- Basic Hill Climbing
- Steepest Ascent Hill Climbing
- Hill Climbing with Random Restart
- Simulated Annealing

✅ **RESTful API Endpoints**
- Solve N-Queens problems
- Calculate heuristic values
- Generate random board states
- Compare algorithm performance
- Batch processing support

✅ **Production Ready**
- CORS configured
- Error handling
- Environment configuration
- Render deployment ready
- Performance optimized

✅ **Educational Features**
- Algorithm information and documentation
- Detailed execution metrics
- Visualization data for step-by-step animation
- Conflict visualization

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
# Edit .env as needed
```

4. **Start the development server**
```bash
npm run dev
```

The server will start on `http://localhost:8000` by default.

## Available Scripts

```bash
# Start production server
npm start

# Start development server with auto-reload
npm run dev

# Run tests
npm test
```

## API Documentation

### Base URL
```
http://localhost:8000/api
```

### Endpoints

#### 1. Health Check
```
GET /health
```
Returns server status and version information.

**Response:**
```json
{
  "status": "healthy",
  "service": "N-Queens Solver API",
  "version": "1.0.0",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

#### 2. Solve N-Queens Problem
```
POST /solve
```
Solves the N-Queens problem using specified algorithm.

**Request Body:**
```json
{
  "n": 8,
  "algorithm": "hillClimbingWithRandomRestart",
  "maxIterations": 1000,
  "maxRestarts": 100
}
```

**Parameters:**
- `n` (required): Board size (4-20)
- `algorithm` (optional): Algorithm to use
  - `basicHillClimbing`
  - `steepestAscent`
  - `hillClimbingWithRandomRestart` (default)
  - `simulatedAnnealing`
- `maxIterations` (optional): Max iterations per run (default: 1000)
- `maxRestarts` (optional): Max restart attempts (default: 100)

**Response:**
```json
{
  "metadata": {
    "boardSize": 8,
    "algorithm": "hillClimbingWithRandomRestart",
    "timestamp": "2024-01-15T10:30:00Z"
  },
  "result": {
    "solved": true,
    "solution": [
      { "row": 0, "col": 0, "position": "a1" },
      { "row": 4, "col": 1, "position": "b5" }
    ],
    "metrics": {
      "iterations": 42,
      "finalCost": 0,
      "executionTime": 156,
      "reason": "solution_found"
    }
  },
  "visualization": {
    "steps": [...],
    "stateCount": 42
  },
  "statistics": {
    "successfulRuns": 1,
    "totalRuns": 12,
    "totalIterations": 342,
    "averageIterationsPerRun": 28
  }
}
```

---

#### 3. Calculate Heuristic Value
```
POST /heuristic
```
Calculates heuristic (conflict) value for a given board state.

**Request Body:**
```json
{
  "board": [0, 4, 7, 5, 2, 6, 1, 3],
  "heuristicType": "conflicts"
}
```

**Parameters:**
- `board` (required): Array of queen positions (index=column, value=row)
- `heuristicType` (optional): Type of heuristic to calculate

**Response:**
```json
{
  "board": [
    { "row": 0, "col": 0, "position": "a1" },
    { "row": 4, "col": 1, "position": "b5" }
  ],
  "heuristic": {
    "conflicts": 0,
    "safe": 8,
    "isSolution": true
  },
  "conflictDetails": {
    "totalConflicts": 0,
    "conflicts": [],
    "safeQueens": 8
  },
  "boardSize": 8
}
```

---

#### 4. Generate Random Board
```
GET /generate/:n
```
Generates a random initial board state.

**Parameters:**
- `n`: Board size (4-20)

**Response:**
```json
{
  "board": [
    { "row": 3, "col": 0, "position": "a4" },
    { "row": 1, "col": 1, "position": "b2" }
  ],
  "boardSize": 8,
  "initialConflicts": 5,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

#### 5. Compare Algorithms
```
GET /compare/:n
```
Compares performance of all algorithms on same problem.

**Parameters:**
- `n`: Board size (4-15)

**Response:**
```json
{
  "boardSize": 8,
  "comparison": {
    "basicHillClimbing": {...},
    "steepestAscent": {...},
    "hillClimbingWithRandomRestart": {...},
    "simulatedAnnealing": {...}
  },
  "totalExecutionTime": 2341,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

#### 6. Get Algorithm Information
```
GET /algorithms
```
Returns detailed information about available algorithms.

**Response:**
```json
{
  "algorithms": [
    {
      "name": "basicHillClimbing",
      "displayName": "Hill Climbing (Random Moves)",
      "description": "Simple hill climbing using random neighbor selection...",
      "pros": ["Fast", "Simple"],
      "cons": ["Gets stuck at local maxima"],
      "complexity": {
        "time": "O(iterations * N²)",
        "space": "O(N)"
      }
    }
  ],
  "nqueensProblem": {
    "description": "Place N queens on an N×N chessboard...",
    "constraints": [...],
    "difficulty": "NP-Complete",
    "knownSolutions": {
      "4": 2,
      "8": 92,
      "12": 14200
    }
  }
}
```

---

#### 7. Batch Solve
```
POST /batch-solve
```
Solves multiple board sizes in one request.

**Request Body:**
```json
{
  "sizes": [8, 10, 12],
  "algorithm": "hillClimbingWithRandomRestart"
}
```

**Response:**
```json
{
  "batchSize": 3,
  "results": [
    { "metadata": {...}, "result": {...} },
    { "metadata": {...}, "result": {...} },
    { "metadata": {...}, "result": {...} }
  ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## Error Handling

The API returns appropriate HTTP status codes and error messages:

```json
{
  "error": "Invalid board size. Must be an integer between 4 and 20.",
  "statusCode": 400
}
```

**Status Codes:**
- `200` - Success
- `400` - Bad request (invalid parameters)
- `404` - Endpoint not found
- `500` - Server error

## Algorithm Explanations

### Hill Climbing (Basic)
- Uses random neighbor selection
- Moves to neighbor if it improves the heuristic
- Fast but often gets stuck at local maxima
- Good for understanding the concept

### Steepest Ascent
- Evaluates all possible neighbors
- Moves to the best neighbor
- Better convergence than basic HC
- More computationally expensive
- Still suffers from local maxima

### Hill Climbing with Random Restart
- Restarts the algorithm multiple times
- Escapes local maxima through fresh starts
- Best for finding complete solutions
- Recommended for production use
- Higher success rate

### Simulated Annealing
- Probabilistically accepts worse moves
- Probability decreases over time (cooling)
- Good for large N values
- Inspired by metallurgy
- Computationally efficient

## Environment Variables

Create a `.env` file in the backend directory:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:5173,http://localhost:3000

# API Configuration
API_PREFIX=/api
```

### For Production (Render):
```env
PORT=8000
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.vercel.app
API_PREFIX=/api
```

## Deployment on Render

### 1. Prepare for Deployment

Ensure `package.json` is properly configured:
```json
{
  "engines": {
    "node": "18.x"
  },
  "scripts": {
    "start": "node src/server.js"
  }
}
```

### 2. Deploy on Render

1. **Push to GitHub**
```bash
git push origin main
```

2. **Create New Web Service on Render**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Environment:** Node

3. **Set Environment Variables**
   - Go to Environment tab
   - Add:
     ```
     PORT=8000
     NODE_ENV=production
     CORS_ORIGIN=https://yourdomain.vercel.app
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy on every push

### 3. Verify Deployment
```bash
curl https://your-service.onrender.com/api/health
```

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Test Endpoints
Use Postman, curl, or your frontend to test:
```bash
curl -X POST http://localhost:8000/api/solve \
  -H "Content-Type: application/json" \
  -d '{"n": 8, "algorithm": "hillClimbingWithRandomRestart"}'
```

## Project Structure

```
backend/
├── src/
│   ├── utils/
│   │   ├── boardGenerator.js      # Board manipulation utilities
│   │   ├── heuristic.js           # Heuristic calculations
│   │   └── hillClimbing.js        # Algorithm implementations
│   ├── services/
│   │   └── solverService.js       # Business logic layer
│   ├── controllers/
│   │   └── solverController.js    # Request handlers
│   ├── routes/
│   │   └── solverRoutes.js        # Route definitions
│   ├── app.js                     # Express app setup
│   └── server.js                  # Server entry point
├── package.json
├── .env
├── .env.example
└── README.md
```

## Performance Considerations

- Board size limit: 4-20 (computational complexity)
- Default iteration limit: 1000 per run
- Default restart limit: 100 attempts
- Response size limited to prevent memory issues
- Visualization steps limited to 500 for performance

## Troubleshooting

### Server won't start
- Check if port 8000 is available
- Verify Node.js is installed: `node --version`
- Check .env file configuration

### CORS errors in frontend
- Verify `CORS_ORIGIN` includes your frontend URL
- Ensure frontend uses correct API URL

### Slow responses
- Reduce `maxIterations` or `maxRestarts`
- Use smaller board sizes for testing
- Check server logs for errors

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - Feel free to use this project for educational and commercial purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check server logs
4. Open an issue on GitHub

---

**Built with ❤️ for AIML learning**
