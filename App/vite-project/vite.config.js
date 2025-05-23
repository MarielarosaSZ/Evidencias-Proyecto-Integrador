import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // O @vitejs/plugin-react si no usas SWC
import tailwindcss from '@tailwindcss/vite' // Importa el plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Añade el plugin de Tailwind CSS v4
  ],
})