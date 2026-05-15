import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cpu, Sparkles } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.16),_transparent_45%)]" />
      <div className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,_rgba(168,85,247,0.18),_transparent_52%)]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl space-y-6">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-sm text-sky-300"
          >
            <Sparkles size={18} /> AI Simulation
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl text-5xl font-semibold tracking-tight text-white sm:text-6xl"
          >
            N-Queen Problem Solver with Hill Climbing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            className="max-w-xl text-lg leading-8 text-slate-300"
          >
            Explore constraint satisfaction and heuristic search through a futuristic AI interface. Visualize queen movement, local maxima, random restarts, and search behavior in an interactive simulation.
          </motion.p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              to="/simulator"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:bg-sky-400"
            >
              Start Simulation
            </Link>
            <a
              href="#explain"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-700/80 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              Learn how it works
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: 'Dynamic heuristics', description: 'Live conflict calculation with each board move.' },
              { label: 'AI search flow', description: 'Stepwise hill climbing with local maxima insight.' },
              { label: 'Responsive visualization', description: 'Neon chessboard and animated decision panels.' },
              { label: 'Modern UI', description: 'Glassmorphism cards with futuristic glow effects.' }
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-3xl border border-slate-700/90 p-5 shadow-board">
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                <p className="mt-3 text-base text-slate-200">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-slate-700/60 bg-slate-950/70 p-6 shadow-board"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_40%),radial-gradient(circle_at_bottom_right,_rgba(168,85,247,0.16),_transparent_35%)]" />
          <div className="relative space-y-4">
            <div className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-400">Simulation status</p>
                  <h2 className="text-2xl font-semibold text-white">Heuristic search ready</h2>
                </div>
                <Cpu size={32} className="text-sky-400" />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4 rounded-3xl border border-slate-700/80 bg-slate-950/90 p-4 text-center">
              {[
                { value: 'N = 8', label: 'Board size' },
                { value: '0', label: 'Conflicts' },
                { value: '0', label: 'Iterations' },
                { value: 'Ready', label: 'Status' }
              ].map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4">
                  <p className="text-2xl font-semibold text-white">{item.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-8 gap-2 rounded-3xl border border-slate-800/80 bg-slate-900/80 p-4 sm:grid-cols-12">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="h-8 rounded-xl bg-slate-800/80" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
