import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": process.env, // Ensure process.env is available globally
  },
  build: {
    outDir: "dist", // Moved outDir here (correct placement)
    rollupOptions: {
      input: {
        main: "./index.html", // Define the main entry point of the app
      },
    },
    target: "es2020", // Set the target for JavaScript output
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".ts": "ts",
        ".tsx": "tsx",
        ".js": "js",
        ".jsx": "jsx",
      },
      // inject: ['import React from "react";'], // Automatically inject React for JSX
    },
  },
  // Disable TypeScript type-checking during build
  typescript: {
    check: false, // Skip TypeScript type checking during build
  },
});
