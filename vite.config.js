import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/portfolio/', // Cambia 'portfolio' por el nombre de tu repositorio en GitHub
})
