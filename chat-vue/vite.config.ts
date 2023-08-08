import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 1997,
        'socket.io': {
            target: 'http://localhost:3000',
            ws: true,
            changeOrigin: true,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                ws: true,
                /** 是否允许跨域 */
                changeOrigin: true,
                rewrite: (path: string) => path.replace("/api", ""),
            }
        }
    }
})
