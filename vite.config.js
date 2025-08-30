import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),],
})













// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// // vite.config.js
// export default {
//   server: {
//     proxy: {
//       '/apis': {
//         target: 'https://apis.ccbp.in',
//         changeOrigin: true,
//         secure: true,
//         rewrite: path => path.replace(/^\/apis/, '') // REMOVE '/apis' prefix
//       }
//     },
//     plugins: [
//     tailwindcss(),
//   ],
//   }
// }

