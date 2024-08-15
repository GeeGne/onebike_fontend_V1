import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        '/src/firebase/authSignUp.js', // Add your problematic module here
        // Add other external modules if needed
      ]
    }
  }
})
