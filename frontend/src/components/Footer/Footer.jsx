const Footer = () => {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/80 py-6 text-slate-400">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-sm md:flex-row md:items-center md:justify-between">
        <p>© 2026 N-Queen AI Solver. Designed for AIML visualization and education.</p>
        <p className="text-slate-500">Deployable to Vercel + Render with separate frontend/backend.</p>
      </div>
    </footer>
  );
};

export default Footer;
