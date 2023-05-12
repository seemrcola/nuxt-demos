<script setup lang='ts'>
import Videos from './components/Video.vue'
import Player from './components/Player.vue'
import Frame from './components/Frame.vue'
</script>

<template>
  <NuxtLayout name="clipping">
    <template #video>
      <Videos />
    </template>
    <template #player>
      <Player />
    </template>
    <template #frame>
      <Frame />
    </template>
  </NuxtLayout>
</template>
