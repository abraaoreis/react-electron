import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import dts from 'vite-plugin-dts';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react() /*, dts()*/],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 5173,
        strictPort: false,
    },
    build: {
        outDir: 'dist',
        sourcemap: true,
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: "@use \"@/styles/variables\" as *;",
            },
        },
    },
});
