import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Carrega variáveis do .env baseado no modo (dev/prod)
  const env = loadEnv(mode, process.cwd(), ''); // O terceiro parâmetro (prefixo) vazio carrega TODAS as variáveis

  return {
   plugins: [react()],
   base: env.VITE_BASE_URL,
   server: {
     host: true // ou "0.0.0.0" para expor a rede
   },
  };
});

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: "/Front_End_Gerenciamento_de_Risco",
//   server: {
//     host: true // ou "0.0.0.0" para expor a rede
//   },
// })
