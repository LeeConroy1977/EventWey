import { defineConfig } from "vite";

export default defineConfig({
  define: {
    "process.env": process.env,
  },
  build: {
    outDir: "build", // Custom output directory
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
