/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        'floating-heart': 'float 8s ease-in-out infinite',
        'fade-in': 'fadeIn 1.5s ease-out both',
        'fade-in-slow': 'fadeIn 3s ease-out both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        }
      },
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
      }
    },
  },
  plugins: [],
};
