module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
      oswald: ["'Oswald'", "sans-serif"],
      poppins: ["'Poppins'", "sans-serif"],
      jetbrains: ["'JetBrains Mono'", "monospace"]
    },
    extend:{
      backgroundImage:{
        '2':"url('https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/2')",
        '3':"url('https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/3')",
        '4':"url('https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/4')",
        '5':"url('https://res.cloudinary.com/dvxgjje9e/image/upload/f_auto,q_auto/5')",
        'register':"url('../../public/assets/images/Event_Cards/register.png')",
        'sponsor':"url('../../public/assets/sponsor_event.jpg')"
      },
      zIndex: {
        '60': 60,
        '70': 70,
        '80': 80,
        '90': 90,
        '100': 100,
      },
      boxShadow:{
        custom:'-3px -7px 36px 19px rgba(127, 38, 131, 0.65)'
      }
    },
    
  },
  variants: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: "#000000",
        blue: "#14213d",
        yellow: "#fca311",
        gray: "#e5e5e5",
        white: "#ffffff",
        cloud: "#a4a4a4",
      },
      display: ["group-hover"],
    },
  },
  plugins: [],
};