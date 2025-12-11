import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  // Proxy API requests to avoid CORS issues during development with METAR API
  server: {
    proxy: {
      "/api/metar": {
        target: "https://aviationweather.gov/api/data",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/metar/, "/metar"),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        /** Useful for code splitting and avoiding big bundle size alerts */
        manualChunks: {
          react: ["react", "react-dom"],
          mui_material: ["@mui/material"],
          mui_icons: ["@mui/icons-material"],
          query: ["@tanstack/react-query"],
          axios: ["axios"],
        },
      },
    },
  },
})
