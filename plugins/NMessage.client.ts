import useMessage from '~/components/NMessage/index'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp
  vueApp.use(useMessage)
})
