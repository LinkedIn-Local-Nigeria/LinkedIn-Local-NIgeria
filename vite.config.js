import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react({
      // Fix JSX runtime issues
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
      babel: {
        plugins: []
      }
    }),
    visualizer({
      filename: "dist/bundle-stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  
  server: {
    port: 3000,
    // Fix MIME type issues
    fs: {
      strict: false,
    },
    // Handle module resolution properly
    middlewareMode: false,
  },

  // Fix module resolution
  resolve: {
    alias: {
      '@': '/src',
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  // Fix JSX handling
  esbuild: {
    jsx: 'automatic',
    jsxDev: true,
    jsxSideEffects: false,
  },

  // Optimize dependencies to prevent initialization errors
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@mux/mux-player-react', // if you're using Mux
    ],
    exclude: [
      '@vite/client', 
      '@vite/env'
    ],
    // Force pre-bundling to avoid runtime issues
    force: false,
  },

  build: {
    // Improve source maps for better debugging
    sourcemap: true,
    
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Video player chunk - isolate to prevent variable conflicts
          if (id.includes("mux") || id.includes("media-chrome") || id.includes("video")) {
            return "video-player";
          }

          // Sanity Studio and its deps
          if (id.includes("sanity") || id.includes("groq") || id.includes("dnd-kit")) {
            return "sanity-studio";
          }

          // Group react libs separately to prevent conflicts
          if (id.includes("react") || id.includes("react-dom")) {
            return "vendor-react";
          }

          // Utils chunk
          if (id.includes("date-fns") || id.includes("lodash")) {
            return "vendor-utils";
          }

          // Node modules that might cause issues
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
        
        // Ensure proper file naming
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      
      // Handle external dependencies properly
      external: [],
      
      // Prevent tree-shaking issues that can cause variable errors
      treeshake: {
        preset: 'recommended',
        manualPureFunctions: ['console.log'],
      },
    },
    
    chunkSizeWarningLimit: 1500,
    
    // Prevent build issues
    minify: 'esbuild',
    target: 'esnext',
    
    // Fix CSS handling
    cssCodeSplit: true,
  },

  // Define environment variables to prevent undefined errors
  define: {
    global: 'globalThis',
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },

  // CSS preprocessing
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/variables.scss";`,
      },
    },
  },
});