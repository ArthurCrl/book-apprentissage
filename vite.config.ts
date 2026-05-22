import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import contentCollections from '@content-collections/vite'

const config = defineConfig({
  base: '/book-apprentissage/',
  resolve: { tsconfigPaths: true },
  plugins: [
    devtools(),
    TanStackRouterVite(),
    contentCollections(),
    tailwindcss(),
    viteReact(),
  ],
})

export default config
