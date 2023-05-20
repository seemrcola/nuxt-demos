<script setup lang='ts'>
import List from './components/list.vue'
</script>

<template>
  <div flex-center p-4>
    <ClientOnly>
      <List />
    </ClientOnly>
  </div>
</template>
