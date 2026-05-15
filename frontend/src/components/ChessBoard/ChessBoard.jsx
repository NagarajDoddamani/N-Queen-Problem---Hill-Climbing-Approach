import { motion } from 'framer-motion';
import { getConflictPositions } from '../../utils/heuristic.js';

const ChessBoard = ({ board, highlight, size = 8, solutionFound }) => {
  const conflictPaths = getConflictPositions(board);
  const cellSize = 100 / size;

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-4 shadow-board">
      <div
        className="grid h-full min-h-[min(520px,calc(12rem+8vw))] gap-0 rounded-[1.75rem] border border-slate-800 bg-[#0b1220] p-3"
        style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: size * size }).map((_, index) => {
          const row = Math.floor(index / size);
          const col = index % size;
          const isQueen = board[col] === row;
          const cellClass = (row + col) % 2 === 0 ? 'bg-slate-900/90' : 'bg-slate-800/90';
          const isHighlighted = highlight?.some((pos) => pos.row === row && pos.col === col);

          return (
            <div
              key={`${row}-${col}`}
              className={`${cellClass} relative flex h-12 min-h-[3rem] items-center justify-center border border-slate-900/80`}
            >
              {isQueen && (
                <motion.div
                  layout
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-500/70 bg-gradient-to-br from-sky-400/80 to-fuchsia-500/80 text-2xl shadow-glow ${solutionFound ? 'ring-2 ring-sky-300' : ''}`}
                >
                  ♛
                </motion.div>
              )}
              {isHighlighted && (
                <div className="pointer-events-none absolute inset-0 rounded-[0.65rem] border border-sky-400/50 bg-sky-500/10" />
              )}
            </div>
          );
        })}
      </div>
      <div className="pointer-events-none absolute inset-0">
        {conflictPaths.map((path, index) => {
          const x1 = (path.from.col + 0.5) * cellSize;
          const y1 = (path.from.row + 0.5) * cellSize;
          const x2 = (path.to.col + 0.5) * cellSize;
          const y2 = (path.to.row + 0.5) * cellSize;
          return (
            <svg key={index} className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <line
                x1={`${x1}%`}
                y1={`${y1}%`}
                x2={`${x2}%`}
                y2={`${y2}%`}
                stroke="rgba(248, 113, 113, 0.75)"
                strokeWidth="0.5"
                strokeLinecap="round"
              />
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default ChessBoard;
