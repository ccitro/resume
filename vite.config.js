import { defineConfig } from 'vite'
import pkg from './package.json' assert { type: 'json' }

export default defineConfig({
  build: {
    copyPublicDir: false,
    outDir: './theme/dist',
    lib: {
      entry: './theme/index.js',
      fileName: 'index',
      formats: ['es', 'cjs', 'umd'],
      name: 'jsonresumeThemeLocal',
    },
    rollupOptions: {
      external: [...Object.keys(pkg.dependencies), /^node:.*/],
    },
    target: 'esnext',
    test: {
      clearMocks: true,
    },
  },
})
