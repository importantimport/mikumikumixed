import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import forgetti from 'vite-plugin-forgetti'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    forgetti({
      filter: {
        exclude: 'node_modules/**/*.{ts,js,tsx,jsx}',
        include: 'src/**/*.{ts,js,tsx,jsx}',
      },
      preset: 'react',
    }),
  ],
  resolve: {
    dedupe: ['three'],
  },
})
