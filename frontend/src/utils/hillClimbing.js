import { calculateConflicts } from './heuristic.js';
import { copyBoard } from './boardGenerator.js';

export const findSteepestNeighbor = (board) => {
  const currentCost = calculateConflicts(board);
  let bestBoard = board;
  let bestCost = currentCost;
  let evaluated = 0;

  board.forEach((_row, col) => {
    for (let row = 0; row < board.length; row += 1) {
      if (board[col] === row) continue;
      const next = copyBoard(board);
      next[col] = row;
      const cost = calculateConflicts(next);
      evaluated += 1;
      if (cost < bestCost) {
        bestCost = cost;
        bestBoard = next;
      }
    }
  });

  return { bestBoard, bestCost, evaluated, currentCost };
};

export const findRandomNeighbor = (board) => {
  const next = copyBoard(board);
  const col = Math.floor(Math.random() * board.length);
  let row = Math.floor(Math.random() * board.length);
  while (row === board[col]) {
    row = Math.floor(Math.random() * board.length);
  }
  next[col] = row;
  return next;
};
