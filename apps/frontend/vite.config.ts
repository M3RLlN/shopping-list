import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // The dev server runs inside the container, the browser runs on Windows.
    // Without this the server only answers requests coming from inside the container,
    // and the page cannot be opened from outside at all.
    host: true,
    watch: {
      // The project folder is mounted in from Windows, and the container is never told when a file in it changes.
      // Vite therefore has to look for changes itself; without this, saving a file would not reload the page.
      usePolling: true,
      // How often to look, in milliseconds.
      interval: 300,
    },
    proxy: {
      "/api": {
        target: "http://localhost:3000",
      },
    },
  },
});
