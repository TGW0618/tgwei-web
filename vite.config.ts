import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import vueDevTools from 'vite-plugin-vue-devtools'
import pxToViewport from 'postcss-px-to-viewport-8-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // vueDevTools(),
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
          viewportWidth: 1920, // 根据你的设计稿宽度填写（常用 1920 或 1440）
          unitPrecision: 5,    // 转换后保留的小数位数
          unitToConvert: 'px',
          viewportUnit: 'vw',
          fontViewportUnit: 'vw',
          selectorBlackList: ['.ignore-', 'px-'], // 忽略的选择器（保留px不转）
          minPixelValue: 1,    // 小于或等于 1px 不转换
          mediaQuery: false,   // 是否允许在媒体查询中转换 px
          exclude: [/node_modules/], // 忽略 node_modules 下的文件
        })
      ]
    }
  }
})
