import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/clipy-clone/',
  // 讓 public/img/* 在 build 時被拷貝到 dist/img/* 而不是作為 hashing assets
  publicDir: 'public',
  build: {
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // 保持圖片檔名不變，不加 hash，避免 cache busting 問題
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.jpg') || name.endsWith('.png') || name.endsWith('.webp')) {
            return 'images/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})
