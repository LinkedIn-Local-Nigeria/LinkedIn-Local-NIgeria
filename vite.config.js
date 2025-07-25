import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: "dist/bundle-stats.html",
      open: false, // optional
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split VideoPlayer and its deps
          if (id.includes("mux") || id.includes("media-chrome")) {
            return "video-player";
          }

          // Split Sanity Studio and its deps
          if (id.includes("sanity") || id.includes("groq") || id.includes("dnd-kit")) {
            return "sanity-studio";
          }

          // Group react libs separately
          if (id.includes("react") || id.includes("react-dom")) {
            return "vendor-react";
          }

          // Example: date-fns, lodash into a utils chunk
          if (id.includes("date-fns") || id.includes("lodash")) {
            return "vendor-utils";
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500, // optional: raise this warning limit
  },
});
