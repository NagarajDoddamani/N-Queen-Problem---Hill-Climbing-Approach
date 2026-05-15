import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Initial State',
    copy: 'A random queen arrangement is generated for the starting board.',
    color: 'from-sky-500 to-indigo-600'
  },
  {
    title: 'Heuristic Evaluation',
    copy: 'Each board is scored by counting attacking queen pairs and unsafe positions.',
    color: 'from-fuchsia-500 to-purple-600'
  },
  {
    title: 'Neighbor Search',
    copy: 'The algorithm generates nearby board states by moving a single queen.',
    color: 'from-cyan-400 to-sky-500'
  },
  {
    title: 'Best Move Selection',
    copy: 'The board transitions to the lowest-conflict neighbor to improve the state.',
    color: 'from-violet-500 to-fuchsia-500'
  },
  {
    title: 'Local Maxima',
    copy: 'If no neighbor is better, the algorithm is stuck and requires a restart.',
    color: 'from-rose-500 to-orange-500'
  }
];

const AlgorithmSteps = () => {
  return (
    <section id="explain" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Algorithm journey</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">How hill climbing makes each queen smarter.</h2>
          <p className="max-w-2xl text-lg leading-8 text-slate-300">
            Follow the AI search flow from a random state to the goal state. Understand why the algorithm can stall in local maxima and how randomized restarts improve success rate.
          </p>
        </div>
        <div className="space-y-5">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="glass-card rounded-[2rem] border border-slate-700/80 p-6 shadow-board"
            >
              <div className={`mb-4 h-1.5 w-20 rounded-full bg-gradient-to-r ${step.color}`} />
              <p className="text-lg font-semibold text-white">{step.title}</p>
              <p className="mt-3 text-slate-300">{step.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AlgorithmSteps;
