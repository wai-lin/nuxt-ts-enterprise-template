import { defineNuxtConfig } from '@nuxtjs/composition-api'

export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt2-ts-template',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['css.gg/icons/all.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://vite.nuxtjs.org/
    'nuxt-vite',
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://composition-api.nuxtjs.org/
    '@nuxtjs/composition-api',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-use-motion'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // typescript runtime linting types
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  generate: {
    // https://composition-api.nuxtjs.org/getting-started/setup
    // ? nuxt composition api static generation
    interval: 2000,
  },

  // nuxt-vite
  vite: {
    optimizeDeps: {
      exclude: ['@vueuse/motion'],
    },
  },

  // nuxt tailwind
  tailwindcss: {
    jit: true,
  },

  // https://storybook.nuxtjs.org/
  storybook: {
    stories: ['~/components/**/*.stories.mdx'],
    addons: [
      'storybook-dark-mode',
      '@storybook/addon-controls',
      '@storybook/addon-docs',
    ],
  },
})
