module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        bgPrimary: "var(--bg-primary)",
        bgSecondary: "var(--bg-secondary)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textTertiary: "var(--text-tertiary)",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      height: {
        "screen-minus-4rem": "calc(100vh - 4rem)",
      },
    },
    screens: {
      mobile: "320px",
      tablet: "640px",
      laptop: "1020px",
      desktop: "1600px",
      "xl-screen": "2400px",
    },
  },
  plugins: [],
};
