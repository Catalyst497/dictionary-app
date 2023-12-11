/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Mono : ['Inconsolata', 'monospace'],
        Serif : ['Lora', 'serif'],
        SansSerif : ['Inter', 'sans-serif']
      },
      colors:{
        purple: "hsl(275, 80%, 56%)",
        purpleBg: "rgba(164,69,237,.25)",
        strawBerry: "hsl(354, 84%, 57%)"
      },
      screens: {
        xs: '370px',
        ss: '620px',
        sm: '768px',
        md: '1060px',
        lg: '1200px',
        xl: '1700px'
      }
    },
  },
  plugins: [],
}