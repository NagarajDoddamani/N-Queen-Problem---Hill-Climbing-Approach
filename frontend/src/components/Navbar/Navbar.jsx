import { NavLink } from 'react-router-dom';
import { Moon, SunMedium } from 'lucide-react';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Simulator', to: '/simulator' },
  { label: 'About', to: '/about' }
];

const Navbar = ({ theme, setTheme }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 via-sky-500 to-violet-500 text-lg shadow-glow">
            ♛
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">N-Queen AI</p>
            <p className="text-xl font-semibold tracking-tight">Hill Climbing Solver</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition ${isActive ? 'text-sky-300' : 'text-slate-300 hover:text-slate-100'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-700/80 bg-slate-900/80 text-slate-200 shadow-glow transition hover:border-slate-500"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunMedium size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
