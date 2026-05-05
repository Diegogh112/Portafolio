import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Portafolio/', // Nombre exacto del repositorio en GitHub (case-sensitive)
})
