// 一个canvas库 https://konvajs.org/docs/vue/index.html
import VueKonva from 'vue-konva'

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp
  vueApp.use(VueKonva)
})
