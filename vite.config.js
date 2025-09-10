// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [
//     laravel({
//       input: 'resources/js/app.jsx',
//       refresh: true,
//     }),
//     react(),
//   ],
//   build: {
//     outDir: 'public/build',
//   },
//   base: '/', 
// });

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
// import path from 'path';

// export default defineConfig({
//   plugins: [react()],
//   root: './', // project root
//   build: {
//     outDir: 'public',       // Build directly into Laravel public folder
//     emptyOutDir: false,     // Keep index.php safe
//     rollupOptions: {
//       input: path.resolve(__dirname, 'index.html'), // Ensure entry point
//     },
//   },
//   resolve: {
//     alias: {
//       '@': path.resolve(__dirname, 'resources/js'),
//     },
//   },
//   base: '/', // Production base URL
// });


import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.jsx',
      refresh: true,
    }),
    react(),
  ],
  build: {
    outDir: 'public/build',
  },
  base: '/', // 👈 important for Azure hosting
});
