// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    baseURL: '/countdown/'
  },
  modules: ["@unocss/nuxt", "@element-plus/nuxt"],
  elementPlus: {
    injectionID: { prefix: 10000, current: 1 },
  },

  css: ["element-plus/theme-chalk/dark/css-vars.css"],

  devtools: {
    enabled: true
  }
});
