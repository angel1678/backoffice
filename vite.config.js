import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        copy({
          targets: [
              { src: './resources/sass/theme/tailwind/fonts/**/*', dest: 'public/fonts' },
          ]
      })
    ],
});
