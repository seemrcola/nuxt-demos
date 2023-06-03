import NMessage from '~/components/NMessage'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp
  vueApp.config.globalProperties.NMessage = NMessage
  console.log('NMessage', vueApp.config.globalProperties.NMessage)
})
