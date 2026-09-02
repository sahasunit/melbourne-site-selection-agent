import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // matches the backend's default ALLOWED_ORIGINS (http://localhost:3000)
  server: {
    port: 3000,
  },
})
