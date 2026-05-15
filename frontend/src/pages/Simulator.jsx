import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ChessBoard from '../components/ChessBoard/ChessBoard.jsx';
import SpeedSlider from '../components/UI/SpeedSlider.jsx';
import useInterval from '../hooks/useInterval.jsx';
import { calculateConflicts, isSolved } from '../utils/heuristic.js';
import { generateRandomBoard } from '../utils/boardGenerator.js';
import { findRandomNeighbor, findSteepestNeighbor } from '../utils/hillClimbing.js';

const algorithms = [
  { value: 'steepest', label: 'Steepest Ascent' },
  { value: 'basic', label: 'Basic Hill Climbing' }
];

const initialBoard = (n) => generateRandomBoard(n);

const Simulator = () => {
  const [n, setN] = useState(8);
  const [board, setBoard] = useState(initialBoard(8));
  const [cost, setCost] = useState(calculateConflicts(board));
  const [iteration, setIteration] = useState(0);
  const [status, setStatus] = useState('idle');
  const [algorithm, setAlgorithm] = useState('steepest');
  const [randomRestart, setRandomRestart] = useState(true);
  const [manualStep, setManualStep] = useState(false);
  const [speed, setSpeed] = useState(700);
  const [restartCount, setRestartCount] = useState(0);
  const [lastAction, setLastAction] = useState('Ready to explore.');
  const [history, setHistory] = useState([]);
  const [solutionFound, setSolutionFound] = useState(false);

  const isSolvedBoard = useMemo(() => isSolved(board), [board]);

  useEffect(() => {
    resetSimulation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  useInterval(
    () => {
      if (status === 'running' && !manualStep) {
        performStep();
      }
    },
    status === 'running' && !manualStep ? speed : null
  );

  const recordStep = (entry) => {
    setHistory((prev) => [entry, ...prev].slice(0, 8));
  };

  const resetSimulation = () => {
    const next = initialBoard(n);
    setBoard(next);
    setCost(calculateConflicts(next));
    setIteration(0);
    setRestartCount(0);
    setStatus('idle');
    setManualStep(false);
    setLastAction('Generated new board.');
    setHistory([]);
    setSolutionFound(false);
  };

  const performStep = () => {
    if (isSolvedBoard) {
      setStatus('solved');
      setLastAction('Solution already found.');
      return;
    }

    let nextBoard;
    let nextCost;
    let nextAction = '';
    let neighborsEvaluated = 0;
    const currentCost = calculateConflicts(board);

    if (algorithm === 'basic') {
      nextBoard = getRandomNeighbor(board);
      nextCost = calculateConflicts(nextBoard);
      neighborsEvaluated = 1;
      if (nextCost < currentCost) {
        nextAction = 'Moved to a better random neighbor.';
      } else {
        nextAction = 'Random neighbor was worse; checking restart.';
      }
    } else {
      const best = getBestNeighbor(board);
      nextBoard = best.bestBoard;
      nextCost = best.bestCost;
      neighborsEvaluated = best.evaluated;
      if (nextCost < currentCost) {
        nextAction = 'Moved to the best neighbor state.';
      }
    }

    if (nextCost < cost) {
      setBoard(nextBoard);
      setCost(nextCost);
      setIteration((value) => value + 1);
      setLastAction(nextAction);
      recordStep({ iteration: iteration + 1, cost: nextCost, action: nextAction, neighborsEvaluated });
    } else if (randomRestart) {
      const restarted = initialBoard(n);
      const restartedCost = calculateConflicts(restarted);
      setBoard(restarted);
      setCost(restartedCost);
      setIteration((value) => value + 1);
      setRestartCount((value) => value + 1);
      setLastAction('Local maximum reached; random restart triggered.');
      recordStep({ iteration: iteration + 1, cost: restartedCost, action: 'Restart', neighborsEvaluated });
    } else {
      setStatus('stuck');
      setLastAction('Stuck at local maxima; enable random restart to continue.');
      recordStep({ iteration: iteration + 1, cost: currentCost, action: 'Stuck', neighborsEvaluated });
    }

    if (nextCost === 0) {
      setSolutionFound(true);
      setStatus('solved');
      setLastAction('Solution discovered!');
      recordStep({ iteration: iteration + 1, cost: 0, action: 'Solved', neighborsEvaluated });
    }
  };

  const handleStart = () => {
    if (status === 'solved') {
      resetSimulation();
    }
    setStatus('running');
  };

  const handlePause = () => setStatus('paused');

  const handleStep = () => {
    if (status !== 'running') {
      setStatus('running');
    }
    performStep();
    setStatus('paused');
  };

  const statusLabel = {
    idle: 'Idle',
    running: 'Running',
    paused: 'Paused',
    stuck: 'Local maxima',
    solved: 'Solved'
  }[status];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-8">
          <div className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-8 shadow-board">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Simulator</p>
                <h1 className="mt-3 text-4xl font-semibold text-white">Interactive hill climbing playground</h1>
                <p className="mt-4 max-w-2xl text-slate-300">
                  Control board size, algorithm style, speed, and random restarts. See how the N-Queen solver evolves toward a conflict-free solution.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleStart}
                  className="rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
                >
                  Start
                </button>
                <button
                  type="button"
                  onClick={handlePause}
                  className="rounded-2xl border border-slate-700/80 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
                >
                  Pause
                </button>
                <button
                  type="button"
                  onClick={resetSimulation}
                  className="rounded-2xl border border-rose-500/50 bg-rose-500/10 px-5 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
                >
                  Reset
                </button>
              </div>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { label: 'Status', value: statusLabel },
                { label: 'Conflict score', value: cost },
                { label: 'Iterations', value: iteration },
                { label: 'Restarts', value: restartCount }
              ].map((group) => (
                <div key={group.label} className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5">
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{group.label}</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{group.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.95fr_0.8fr]">
            <div className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-6 shadow-board">
              <div className="grid gap-6 md:grid-cols-2">
                <label className="block space-y-3 rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5">
                  <span className="text-sm uppercase tracking-[0.24em] text-slate-400">Board size</span>
                  <select
                    value={n}
                    onChange={(event) => setN(Number(event.target.value))}
                    className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-white outline-none"
                  >
                    {[4, 6, 8, 10, 12, 14].map((value) => (
                      <option key={value} value={value} className="bg-slate-950 text-white">
                        {value} × {value}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block space-y-3 rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5">
                  <span className="text-sm uppercase tracking-[0.24em] text-slate-400">Algorithm</span>
                  <select
                    value={algorithm}
                    onChange={(event) => setAlgorithm(event.target.value)}
                    className="w-full rounded-2xl border border-slate-700/80 bg-slate-950/90 px-4 py-3 text-white outline-none"
                  >
                    {algorithms.map((option) => (
                      <option key={option.value} value={option.value} className="bg-slate-950 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="inline-flex items-center gap-3 rounded-3xl border border-slate-800/90 bg-slate-900/80 px-5 py-4">
                  <input
                    type="checkbox"
                    checked={randomRestart}
                    onChange={() => setRandomRestart((value) => !value)}
                    className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-sky-400 outline-none accent-sky-400"
                  />
                  <span className="text-sm text-slate-200">Random restart</span>
                </label>
                <label className="inline-flex items-center gap-3 rounded-3xl border border-slate-800/90 bg-slate-900/80 px-5 py-4">
                  <input
                    type="checkbox"
                    checked={manualStep}
                    onChange={() => setManualStep((value) => !value)}
                    className="h-5 w-5 rounded border-slate-600 bg-slate-900 text-sky-400 outline-none accent-sky-400"
                  />
                  <span className="text-sm text-slate-200">Manual step mode</span>
                </label>
              </div>

              <div className="mt-6">
                <SpeedSlider speed={speed} setSpeed={setSpeed} />
              </div>
            </div>

            <div className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-6 shadow-board">
              <h2 className="text-xl font-semibold text-white">Execution log</h2>
              <p className="mt-3 text-slate-300">Watch how the solver evolves. Each iteration reduces conflicts or triggers a restart.</p>
              <div className="mt-6 space-y-4">
                <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Recent action</p>
                  <p className="mt-3 text-base text-white">{lastAction}</p>
                </div>
                <div className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5 text-slate-200">
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Manual control</p>
                  <button
                    type="button"
                    onClick={handleStep}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-slate-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-600"
                    disabled={!manualStep}
                  >
                    Step forward
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-6 shadow-board">
            <h2 className="text-xl font-semibold text-white">Solver history</h2>
            <div className="mt-5 space-y-4">
              {history.length === 0 ? (
                <p className="text-slate-400">No steps executed yet. Click start or manual step to see the solver work.</p>
              ) : (
                history.map((entry, index) => (
                  <div key={index} className="rounded-3xl border border-slate-800/90 bg-slate-900/80 p-4">
                    <div className="flex items-center justify-between gap-3 text-slate-300">
                      <span className="text-sm">Iteration {entry.iteration}</span>
                      <span className="text-sm text-sky-300">Conflicts: {entry.cost}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">{entry.action}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.24em] text-slate-500">Neighbors evaluated: {entry.neighborsEvaluated}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-6 shadow-board"
          >
            <h2 className="text-xl font-semibold text-white">Active board</h2>
            <p className="mt-3 text-slate-400">Neon visualization with conflict paths and animated queen motion.</p>
            <div className="mt-6">
              <ChessBoard board={board} size={n} solutionFound={solutionFound} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/80 p-6 shadow-board"
          >
            <h2 className="text-xl font-semibold text-white">Local maxima</h2>
            <p className="mt-3 text-slate-300">
              If the solver cannot find a better neighbor, the board is stuck. Enable random restart to escape and continue searching.
            </p>
            <div className="mt-6 rounded-3xl border border-slate-800/90 bg-slate-900/80 p-5 text-slate-200">
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Current mode</p>
              <p className="mt-3 text-lg text-white">{randomRestart ? 'Random restart enabled' : 'No restart'}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Simulator;
