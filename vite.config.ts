import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { envs } from './src/core/env.js';

const baseUrl = envs.VITE_BASE_URL || '/toolkit';

// https://vite.dev/config/
export default defineConfig({
  root: '.',
  base: baseUrl,
  plugins: [react(), tailwindcss(),],
})
