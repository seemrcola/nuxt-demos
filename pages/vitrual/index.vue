<script setup lang='ts'>
import List from './components/list.vue'
</script>

<template>
  <div>
    <ClientOnly>
      <List />
    </ClientOnly>
  </div>
</template>
