// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  css: ['~/assets/css/main.css'],

  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@pinia/nuxt",
  ],

  runtimeConfig: {
    public: {
      backBaseUrl: process.env.NUXT_PUBLIC_BACK_BASE_URL || 'http://localhost:3000', // Default fallback
    },
  },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
  },

  colorMode: {
    classSuffix: '', // Removes suffix so classes are `dark` or `light`
    preference: 'dark', // Default theme based on the user's system preference
    fallback: 'dark', // Fallback theme if no preference is set
  },

  pinia: {
    storesDirs: ['./stores/**'],
  },

  imports: {
    imports: [{
      from: "tailwind-variants",
      name: "tv",
    }, {
      from: "tailwind-variants",
      name: "VariantProps",
      type: true,
    }, {
      from: "vue-sonner",
      name: "toast",
      as: "useSonner"
    }],
  },

  build: {
    transpile: ["vue-sonner"]
  }
});