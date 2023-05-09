// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: ["@unocss/nuxt", "@element-plus/nuxt"],
  elementPlus: {
    injectionID: { prefix: 10000, current: 1 },
  },
  app: {
    baseURL: process.env.NUXT_APP_GITHUB_PAGES === 'true' ? '/countdown/' : '/'
  },
  css: ["element-plus/theme-chalk/dark/css-vars.css"],

  devtools: {
    enabled: true
  }
});
