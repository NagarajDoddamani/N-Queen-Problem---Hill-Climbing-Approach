import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './context/ThemeContext.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './pages/Home.jsx';
import Simulator from './pages/Simulator.jsx';
import About from './pages/About.jsx';

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={theme === 'dark' ? 'bg-[#050816] text-white' : 'bg-slate-100 text-slate-900'}>
      <Router>
        <Navbar theme={theme} setTheme={setTheme} />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="min-h-screen"
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
