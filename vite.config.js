import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Proyecto-react/', // <-- ESTO arregla el error 404 de tu imagen
})
