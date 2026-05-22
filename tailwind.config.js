module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        terminal: {
          green: '#00FF41',
          'green-dim': '#00CC33',
          'green-dark': '#003300',
          amber: '#FFB700',
          cyan: '#00FFFF',
          bg: '#0A0A0A',
          card: '#0D0D0D',
          border: '#1A2A1A',
          muted: '#4D4D4D',
          text: '#AAAAAA',
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Courier New'", 'monospace'],
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,255,65,0.3)' },
          '50%': { boxShadow: '0 0 25px rgba(0,255,65,0.6)' },
        },
      },
    },
  },
  plugins: [],
}
