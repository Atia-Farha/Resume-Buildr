export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: false},
    modules: ['@nuxt/eslint', '@pinia/nuxt'],
    css: ['@/assets/css/global.css'],
    nitro: {
        preset: 'vercel'
    }
})