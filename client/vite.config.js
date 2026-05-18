import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    // Permet les connexions depuis Docker
    host: "0.0.0.0",
    // En dev, on peut proxy /api vers l'API (optionnel si on utilise VITE_API_URL)
    proxy: {
      "/api": {
        target: "http://api:5000",
        changeOrigin: true,
      },
    },
  },
});