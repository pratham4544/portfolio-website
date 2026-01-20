module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        alchemy: {
          purple: '#4A1A5C',
          cyan: '#00D9FF',
          gold: '#FFD700',
          parchment: '#F4E4C1',
          dark: '#0A0612',
          ember: '#FF6B35',
          poison: '#39FF14',
          blood: '#8B0000',
          silver: '#C0C0C0',
        }
      },
      fontFamily: {
        mystical: ['Libre Baskerville', 'serif'],
        handwritten: ['Satisfy', 'cursive'],
        elegant: ['Cormorant Garamond', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'flicker': 'flicker 3s ease-in-out infinite',
        'unfurl': 'unfurl 0.8s ease-out forwards',
        'bubble': 'bubble 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5', filter: 'brightness(1)' },
          '50%': { opacity: '1', filter: 'brightness(1.5)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        unfurl: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
        bubble: {
          '0%, 100%': { transform: 'translateY(0) scale(1)' },
          '50%': { transform: 'translateY(-10px) scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
}