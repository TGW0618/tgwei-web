import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  css: {
    postcss: {
      plugins: [
        pxToViewport({
          viewportWidth: 1920,
          unitPrecision: 5,
          unitToConvert: 'px',
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['.ignore-', 'px-'],
          minPixelValue: 1,
          mediaQuery: false,
          exclude: [/node_modules/],
        })
      ]
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})