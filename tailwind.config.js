module.exports = {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Specify the files to scan for classes
  theme: {
    extend: {
      colors: {
        // Add custom colors for the dark mode if needed
        primary: {
          light: '#3b82f6', // Light theme primary color
          dark: '#2563eb', // Dark theme primary color
        },
        background: {
          light: '#ffffff', // Light theme background
          dark: '#1f2937', // Dark theme background
        },
      },
    },
  },
  plugins: [],
};
