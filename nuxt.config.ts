// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: false },
	modules: ['@nuxt/eslint', '@nuxt/hints', '@nuxt/image', '@pinia/nuxt'],
	css: ['@/assets/css/global.css'],
})