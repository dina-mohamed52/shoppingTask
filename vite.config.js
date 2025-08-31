import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target:
          "https://script.google.com/macros/s/AKfycbz3i2P7QXOH6i-zHI5hUzwl4pcG1uMIeWO7wOVRPHVz3i7Sh83JKk_E2nMRmgvOLdAZKw/exec",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
