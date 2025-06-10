import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // O @vitejs/plugin-react si no usas SWC


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    
  ],
})