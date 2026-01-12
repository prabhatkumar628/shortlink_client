import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3006",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  base: "/", // yeh ensure kare correct path
  plugins: [react(), tailwindcss()],
});
