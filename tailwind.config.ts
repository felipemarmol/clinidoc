import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#121417',
        muted: '#6D737A',
        cream: '#F7F2EA',
        sage: '#2D5D4B',
        terracotta: '#B96F54'
      },
      boxShadow: { soft: '0 20px 60px rgba(18, 20, 23, 0.08)' }
    }
  },
  plugins: []
}
export default config
