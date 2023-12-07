import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dns from "dns";
dns.setDefaultResultOrder("verbatim");
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      src: "/src",
      components: "/src/components",
      shared: "/src/shared",
      dashboard: "/src/dashboard",
      app: "/src/app",
      assets: "/src/assets",
      pages: "/src/pages",
      node_modules: "node_modules",
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
