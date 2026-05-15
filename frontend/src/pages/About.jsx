import { motion } from 'framer-motion';

const sections = [
  {
    title: 'What is the N-Queen problem?',
    content:
      'Place N queens on an N×N chessboard so that none attack each other. Each queen must be safe from row, column, and diagonal attacks.'
  },
  {
    title: 'Why hill climbing?',
    content:
      'Hill climbing is a greedy local search approach. It improves a solution step by step by selecting lower-conflict neighbors, making it great for AI demonstration.'
  },
  {
    title: 'Local maxima explained',
    content:
      'The solver can get stuck when no neighbor improves the board. Random restarts help escape local maxima and find valid solutions.'
  }
];

const About = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[0.95fr_0.75fr]">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/75 p-8 shadow-board"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Project brief</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">A modern AIML simulation platform.</h1>
          <p className="mt-6 leading-8 text-slate-300">
            This application reveals the dynamics of heuristic search through an immersive, futuristic design. It combines algorithm education with interactive visuals, live metrics, and step-by-step solver animation.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {sections.map((section) => (
              <div key={section.title} className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-5">
                <p className="text-lg font-semibold text-white">{section.title}</p>
                <p className="mt-3 text-slate-300">{section.content}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/75 p-8 shadow-board"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-sky-300">Education goals</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">What learners take away</h2>
          <ul className="mt-6 space-y-4 text-slate-300">
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
              Understand hill climbing and heuristic search behavior.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
              Visualize local maxima, restart strategies, and search stability.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-400" />
              Explore tradeoffs between speed, accuracy, and complexity.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-slate-400" />
              Learn a full-stack AIML deployment-ready architecture.
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
