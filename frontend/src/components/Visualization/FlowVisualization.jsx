const FlowVisualization = () => {
  const flow = [
    { label: 'Random board', color: 'bg-sky-500' },
    { label: 'Evaluate heuristic', color: 'bg-fuchsia-500' },
    { label: 'Search neighbor', color: 'bg-cyan-400' },
    { label: 'Pick best move', color: 'bg-violet-500' },
    { label: 'Goal or restart', color: 'bg-rose-500' }
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-12">
      <div className="glass-card rounded-[2rem] border border-slate-700/80 bg-slate-950/70 p-8 shadow-board">
        <h2 className="text-3xl font-semibold text-white">AI decision flow</h2>
        <p className="mt-3 max-w-2xl text-slate-300">Visualize the core hill climbing loop and follow the solver logic from start to finish.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {flow.map((item) => (
            <div key={item.label} className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-5 text-center">
              <div className={`mx-auto mb-4 h-14 w-14 rounded-full ${item.color} bg-opacity-30`} />
              <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FlowVisualization;
