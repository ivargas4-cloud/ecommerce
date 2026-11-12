// Configuración de Vite: usa el complemento oficial para transformar JSX de React.
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // app.js e imágenes viven en public para conservar sus rutas actuales.
});
