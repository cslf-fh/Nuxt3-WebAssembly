import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: { strict: true },
  ssr: false,
  vite: {
    plugins: [wasm(), topLevelAwait()],
  },
});
