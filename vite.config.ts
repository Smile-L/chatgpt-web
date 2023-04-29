import path from 'path'
// import { defineConfig, loadEnv } from 'vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig((env) => {
  // const viteEnv = loadEnv(env.mode, process.cwd()) as unknown as ImportMetaEnv
  const viteEnv = {
    VITE_GLOB_API_URL: '/api',
    VITE_APP_API_BASE_URL: 'http://127.0.0.1:3002/',
    VITE_USER_API_BASE_URL: 'http://127.0.0.1:8000/',
    VITE_GLOB_OPEN_LONG_REPLY: 'false',
  }
  // console.log(viteEnv)
  return {
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), 'src'),
      },
    },
    plugins: [
      vue(),
      VitePWA({
        injectRegister: 'auto',
        manifest: {
          name: 'chatGPT',
          short_name: 'chatGPT',
          icons: [
            { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
            { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          ],
        },
      }),
    ],
    server: {
      host: '0.0.0.0',
      port: 1002,
      open: false,
      proxy: {
        '/chatapi': {
          target: viteEnv.VITE_APP_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/chatapi/', '/'),
        },
        '/loginapi': {
          target: viteEnv.VITE_USER_API_BASE_URL,
          changeOrigin: true, // 允许跨域
          rewrite: path => path.replace('/loginapi/', '/'),
        },
      },
    },
    build: {
      reportCompressedSize: false,
      sourcemap: false,
      commonjsOptions: {
        ignoreTryCatch: false,
      },
    },
  }
})
