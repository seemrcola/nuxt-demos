<script setup lang='ts'>
import CodeMirror from './components/CodeMirror.vue'
</script>

<template>
  <div wh-full>
    <ClientOnly>
      <CodeMirror />
    </ClientOnly>
  </div>
</template>
