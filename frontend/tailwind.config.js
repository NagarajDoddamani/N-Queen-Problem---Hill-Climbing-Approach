import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        glow: '0 0 50px rgba(130, 87, 255, 0.25)',
        board: '0 35px 80px rgba(0, 0, 0, 0.35)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top left, rgba(96, 165, 250, 0.14), transparent 40%), radial-gradient(circle at bottom right, rgba(168, 85, 247, 0.14), transparent 35%)'
      }
    }
  },
  plugins: []
};
