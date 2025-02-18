import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: true,
  },
  server: {
    open: true,
    // Removed the invalid 'debug' option
    // Adding some useful development options
    watch: {
      usePolling: true,
    },
    host: true,
  },
  // Add better error reporting
  esbuild: {
    logOverride: { "this-is-undefined-in-esm": "silent" },
  },
});
