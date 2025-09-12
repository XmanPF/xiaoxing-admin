import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
   server: {
        port: 5173,
        proxy: {
            "/xiaoxing": {
                target: "http://47.110.85.98:9888",
                changeOrigin: true,//开启代理，允许跨域
                rewrite: path => path.replace(/^\/xiaoxing/, '') // 设置重写的路径u
            },
        }
    },
});
