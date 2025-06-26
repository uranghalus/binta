import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
export default defineConfig({
    // server: {
    //     host: '0.0.0.0', // Penting: supaya bisa diakses dari luar container
    //     port: 5174, // Pastikan sesuai dengan yang digunakan
    //     https: {
    //         key: fs.readFileSync(path.resolve(__dirname, 'docker/ssl/dev-key.pem')),
    //         cert: fs.readFileSync(path.resolve(__dirname, 'docker/ssl/dev-cert.pem')),
    //     },
    //     hmr: {
    //         host: 'localhost', // ganti dengan IP host kamu jika perlu (lihat di bawah)
    //     },
    // },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
        },
    },
});
