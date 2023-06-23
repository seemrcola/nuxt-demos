<script setup lang='ts'>
import Lazy from './components/lazy.vue'
import images from './image.json'
</script>

<template>
  <ClientOnly>
    <div wh-full overflow-auto>
      <Lazy :images="images" :col="4" :col-width="300" />
    </div>
  </ClientOnly>
</template>
