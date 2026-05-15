const SpeedSlider = ({ speed, setSpeed }) => {
  return (
    <div className="glass-card rounded-3xl border border-slate-700/80 p-5 shadow-board">
      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Simulation speed</p>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-slate-300">Slow</span>
        <input
          type="range"
          min="300"
          max="1200"
          step="100"
          value={speed}
          onChange={(event) => setSpeed(Number(event.target.value))}
          className="w-full accent-sky-400"
        />
        <span className="text-slate-100">Fast</span>
      </div>
      <p className="mt-3 text-sm text-slate-400">Current delay: {speed}ms</p>
    </div>
  );
};

export default SpeedSlider;
