/**
 * Utility functions for generating and manipulating chess boards
 */

/**
 * Generates a random initial board state for N-Queens problem
 * @param {number} n - Number of queens and board size
 * @returns {Array<number>} Array where index is column and value is row
 */
export const generateRandomBoard = (n) => {
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(Math.floor(Math.random() * n));
  }
  return board;
};

/**
 * Creates a copy of the board
 * @param {Array<number>} board - Current board state
 * @returns {Array<number>} Deep copy of the board
 */
export const copyBoard = (board) => {
  return [...board];
};

/**
 * Validates if a board configuration is valid
 * @param {Array<number>} board - Board configuration
 * @returns {boolean} True if valid
 */
export const isValidBoard = (board) => {
  if (!Array.isArray(board)) return false;
  return board.every((row, col) => {
    return typeof row === 'number' && row >= 0 && row < board.length;
  });
};

/**
 * Generates all neighboring board states by moving one queen
 * @param {Array<number>} board - Current board state
 * @returns {Array<Array<number>>} Array of neighboring board states
 */
export const getNeighbors = (board) => {
  const neighbors = [];
  const n = board.length;

  for (let col = 0; col < n; col++) {
    for (let row = 0; row < n; row++) {
      // Skip if queen is already at this position
      if (board[col] === row) continue;

      // Create neighbor by moving queen in column col to row
      const neighbor = copyBoard(board);
      neighbor[col] = row;
      neighbors.push(neighbor);
    }
  }

  return neighbors;
};

/**
 * Gets a single random neighbor by moving one queen randomly
 * @param {Array<number>} board - Current board state
 * @returns {Array<number>} A random neighboring board state
 */
export const getRandomNeighbor = (board) => {
  const n = board.length;
  const neighbor = copyBoard(board);

  // Pick a random column
  const randomCol = Math.floor(Math.random() * n);

  // Pick a random row (different from current)
  let randomRow = Math.floor(Math.random() * n);
  while (randomRow === board[randomCol]) {
    randomRow = Math.floor(Math.random() * n);
  }

  neighbor[randomCol] = randomRow;
  return neighbor;
};

/**
 * Converts board to visual representation for frontend
 * @param {Array<number>} board - Board configuration
 * @returns {Array<{row: number, col: number}>} Position array
 */
export const boardToPositions = (board) => {
  return board.map((row, col) => ({
    row,
    col
  }));
};

/**
 * Generates initial board state with all queens in first row
 * @param {number} n - Board size
 * @returns {Array<number>} Initial board state
 */
export const generateInitialBoard = (n) => {
  const board = [];
  for (let i = 0; i < n; i++) {
    board.push(0);
  }
  return board;
};
