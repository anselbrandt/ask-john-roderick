import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host:"air.anselbrandt.net",
    https: {
      cert: 'cert.pem',
      key: 'key.pem'
    }
  }
})
