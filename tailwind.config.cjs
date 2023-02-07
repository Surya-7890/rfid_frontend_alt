/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'blue-bg' : '#2e3579',
        'yellow-bg' : '#ffe500',
        'ylw' : '#F2AA4CFF'
      },
      objectPosition : {
        '65' : '258px'
      }
    },
  },
  plugins: [],
}
