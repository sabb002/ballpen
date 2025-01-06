/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    screens:{
      'tablet':'768px',
      'laptop':'1024px'
    },
    extend: {
      boxShadow:{
        'card': 'rgba(0, 0, 0, 0.06) 0px 1px 3px, rgba(0, 0, 0, 0.12) 0px 1px 2px'
      }
    },
  },
  plugins: [],
}

