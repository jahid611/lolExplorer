import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Aliases pour simplifier les imports
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@api': path.resolve(__dirname, './src/api'),
    },
  },
  server: {
    port: 5173, // Port du serveur de développement
    strictPort: true, // Fait échouer le lancement si le port est déjà utilisé
    proxy: {
      // Proxy pour les appels API backend
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist', // Dossier de sortie pour la build
    sourcemap: true, // Générer les sourcemaps pour faciliter le débogage
  },
});
