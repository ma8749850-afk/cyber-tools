import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cyber-tools/', // ضفنا السطر ده (ده هيكون اسم المستودع على جيت هاب)
})