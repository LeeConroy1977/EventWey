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
      mobile: "375px",
      tablet: "768px",
      "tablet-portrait": {
        raw: "(min-width: 768px) and (max-width: 1023px) and (orientation: portrait)",
      },
      "tablet-landscape": {
        raw: "(min-width: 768px) and (max-width: 1023px) and (orientation: landscape)",
      },
      laptop: "1024px",
      desktop: "1280px",
      "xl-screen": "1600px",
    },
  },
  plugins: [],
};
