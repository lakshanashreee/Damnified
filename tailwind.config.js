module.exports = {
  mode: "jit",  // Just-In-Time mode for all utilities
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Add custom gradients or shadows here if you want
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle, var(--tw-gradient-stops))",
      },
      dropShadow: {
        "neon-purple": "0 0 10px #8b5cf6",
      },
    },
  },
  plugins: [],
};
