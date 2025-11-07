/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        eco: {
          blue: "#0B1020",
          blue2: "#0F1730",
          blue3: "#121C3A",
          text: "#E9EEF7",
          text2: "#AAB4C6",
          accent: "#36D399",
          accent2: "#2BC28A"
        }
      },
      boxShadow:{ soft:"0 8px 20px rgba(0,0,0,.25)" },
      borderRadius:{ xl2:"1rem" }
    }
  },
  plugins: []
}
