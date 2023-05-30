<script setup lang='ts'>
import { useClipper } from '~/store/clipper'

const clipperStore = useClipper()
</script>

<template>
  <div wh-full flex-center bg="#eee">
    <video
      v-if="clipperStore.videoSrc"
      id="player"
      :src="clipperStore.videoSrc"
      playsinline controls autoplay loop
      w-full h-auto
    />
    <div v-else>
      <div i-arcticons:nothing-camera h-20 w-20 color-gray />
    </div>
  </div>
</template>
