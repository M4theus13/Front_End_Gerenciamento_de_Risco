import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/Front_End_Gerenciamento_de_Risco",
  server: {
    host: true // ou "0.0.0.0" para expor a rede
  }
})
