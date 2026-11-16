import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     base: '/oculens-retinal-ai/', // <-- Yahan apni GitHub repository ka exact naam likhein
     plugins: [react(), tailwindcss()],
   })