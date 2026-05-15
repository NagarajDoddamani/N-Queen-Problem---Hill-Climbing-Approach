export const calculateConflicts = (board) => {
  let conflicts = 0;
  const n = board.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (board[i] === board[j] || Math.abs(board[i] - board[j]) === Math.abs(i - j)) {
        conflicts += 1;
      }
    }
  }

  return conflicts;
};

export const getConflictPositions = (board) => {
  const conflictPairs = [];
  const n = board.length;

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (board[i] === board[j] || Math.abs(board[i] - board[j]) === Math.abs(i - j)) {
        conflictPairs.push({ from: { row: board[i], col: i }, to: { row: board[j], col: j } });
      }
    }
  }

  return conflictPairs;
};

export const isSolved = (board) => calculateConflicts(board) === 0;
