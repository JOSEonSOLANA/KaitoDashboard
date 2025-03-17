import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Asegúrate de que el puerto es el correcto
    open: true, // Opcional, para abrir el navegador automáticamente
    cors: true // Habilita CORS si es necesario
  }
});
