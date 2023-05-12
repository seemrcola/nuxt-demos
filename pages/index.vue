<script setup lang='ts'>
import { useRouter } from 'vue-router'

const $router = useRouter()
function gotoEdit() {
  $router.push('/editor')
}
function gotoClipping() {
  $router.push('/clipping')
}
</script>

<template>
  <div
    h="100vh" w="100vw"
    flex flex-col justify-center items-center
  >
    <div
      b="1px solid orange" w-100 h-40 rounded-4
      flex justify-center items-center
      cursor-pointer
      hover="bg-orange-400 shadow-md scale-105 b-2 color-white"
      transition duration-300
      @click="gotoEdit"
    >
      Go To Edit Page
    </div>
    <div h-20 />
    <div
      b="1px solid orange" w-100 h-40 rounded-4
      flex justify-center items-center
      cursor-pointer
      hover="bg-orange-400 shadow-md scale-105 b-2 color-white"
      transition duration-300
      @click="gotoClipping"
    >
      Go To Clipping Page
    </div>
  </div>
</template>
