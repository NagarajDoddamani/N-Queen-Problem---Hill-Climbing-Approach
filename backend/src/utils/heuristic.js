/**
 * Heuristic functions for N-Queens problem
 * The heuristic calculates the number of queen pairs that attack each other
 * Lower value = better configuration (goal is 0 conflicts)
 */

/**
 * Counts the number of attacking queen pairs on the board
 * @param {Array<number>} board - Board configuration where index=col, value=row
 * @returns {number} Number of attacking pairs
 */
export const calculateConflicts = (board) => {
  let conflicts = 0;
  const n = board.length;

  for (let col1 = 0; col1 < n; col1++) {
    for (let col2 = col1 + 1; col2 < n; col2++) {
      const row1 = board[col1];
      const row2 = board[col2];

      // Check if queens attack each other
      // Same row
      if (row1 === row2) {
        conflicts++;
      }
      // Diagonal
      else if (Math.abs(row1 - row2) === Math.abs(col1 - col2)) {
        conflicts++;
      }
    }
  }

  return conflicts;
};

/**
 * Alternative heuristic: counts total attacking pairs including all attacks
 * @param {Array<number>} board - Board configuration
 * @returns {number} Total number of attacks
 */
export const calculateTotalAttacks = (board) => {
  return calculateConflicts(board);
};

/**
 * Calculates attacking queens on the board (number of queens under attack)
 * @param {Array<number>} board - Board configuration
 * @returns {number} Number of queens under attack
 */
export const calculateAttackingQueens = (board) => {
  const attacked = new Set();
  const n = board.length;

  for (let col1 = 0; col1 < n; col1++) {
    for (let col2 = col1 + 1; col2 < n; col2++) {
      const row1 = board[col1];
      const row2 = board[col2];

      // Check if queens attack each other
      if (row1 === row2 || Math.abs(row1 - row2) === Math.abs(col1 - col2)) {
        attacked.add(col1);
        attacked.add(col2);
      }
    }
  }

  return attacked.size;
};

/**
 * Calculates safe positions (queens not under attack)
 * @param {Array<number>} board - Board configuration
 * @returns {number} Number of safe queens
 */
export const calculateSafeQueens = (board) => {
  return board.length - calculateAttackingQueens(board);
};

/**
 * Checks if the board is a solution (no conflicts)
 * @param {Array<number>} board - Board configuration
 * @returns {boolean} True if solution found
 */
export const isSolution = (board) => {
  return calculateConflicts(board) === 0;
};

/**
 * Gets detailed conflict information for visualization
 * @param {Array<number>} board - Board configuration
 * @returns {Object} Detailed conflict data
 */
export const getConflictDetails = (board) => {
  const conflicts = [];
  const n = board.length;

  for (let col1 = 0; col1 < n; col1++) {
    for (let col2 = col1 + 1; col2 < n; col2++) {
      const row1 = board[col1];
      const row2 = board[col2];

      let conflictType = null;

      if (row1 === row2) {
        conflictType = 'row';
      } else if (Math.abs(row1 - row2) === Math.abs(col1 - col2)) {
        conflictType = 'diagonal';
      }

      if (conflictType) {
        conflicts.push({
          queen1: { row: row1, col: col1 },
          queen2: { row: row2, col: col2 },
          type: conflictType
        });
      }
    }
  }

  return {
    totalConflicts: conflicts.length,
    conflicts,
    safeQueens: n - new Set(conflicts.flatMap(c => [c.queen1.col, c.queen2.col])).size
  };
};
