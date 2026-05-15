import { motion } from 'framer-motion';

const stats = [
  { label: 'Time Complexity', value: 'O(iterations × N²)', detail: 'Neighbor evaluation and heuristic scoring.' },
  { label: 'Space Complexity', value: 'O(N)', detail: 'Board state and execution metadata.' },
  { label: 'Performance', value: 'Superfast for N ≤ 12', detail: 'Random restarts help find solutions quickly.' }
];

const ComplexityStats = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
      <div className="rounded-[2rem] border border-slate-700/80 bg-slate-950/70 p-8 shadow-board">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Complexity analysis</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">Performance as N grows</h2>
            <p className="mt-4 max-w-2xl text-slate-300">
              Hill climbing is efficient for moderate board sizes, but the probability of local maxima increases with N. Random restart and heuristic optimization keep the solver stable.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl border border-slate-700/80 p-6 shadow-board"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
                <p className="mt-3 text-2xl font-semibold text-white">{item.value}</p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplexityStats;
