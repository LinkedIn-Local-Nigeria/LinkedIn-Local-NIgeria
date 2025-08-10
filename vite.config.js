import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
    visualizer({
      filename: "dist/bundle-stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  
  resolve: {
    alias: {
      '@': '/src',
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  esbuild: {
    jsx: 'automatic',
    jsxDev: false,
    target: 'es2020',
    format: 'esm',
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [],
  },

  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'react-helmet-async',
      'react-hot-toast',
      '@radix-ui/themes'
    ],
    force: true, 
  },

  server: {
    port: 3000,
    fs: {
      strict: false,
    },
  },

  build: {
    target: 'es2020',
    sourcemap: false,
    minify: 'esbuild',
    
    rollupOptions: {
      input: {
        main: './index.html'
      },
      
      output: {
        // Fixed: Remove format from output (it should be inferred)
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash].[ext]`;
          }
          if (/mp4|webm|ogg|mp3|wav|flac|aac/i.test(ext)) {
            return `media/[name]-[hash].[ext]`;
          }
          return `assets/[name]-[hash].[ext]`;
        },
        
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-ui': ['@radix-ui/themes', 'react-helmet-async', 'react-hot-toast'],
          'vendor-router': ['react-router-dom'],
          'video-player': ['@mux/mux-player-react'],
          'sanity-client': ['@sanity/client', 'groq'],
        },
        
        // Format should be here, not nested
        format: 'es',
      },
      
      treeshake: {
        preset: 'recommended',
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    cssMinify: true,
    chunkSizeWarningLimit: 1000,
  },

  define: {
    global: 'globalThis',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },

  css: {
    devSourcemap: false,
  },
});