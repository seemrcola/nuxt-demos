<script setup lang='ts'>
import { useClipper } from '~/store/clipper'

const clipperStore = useClipper()
</script>

<template>
  <div flex-center wh-full overflow-x-scroll>
    <img
      v-for="(frame, index) of clipperStore.frames" :key="index"
      h="70%" w="auto" object-cover
      :src="frame"
    >
  </div>
</template>
