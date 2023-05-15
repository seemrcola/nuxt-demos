<script setup lang='ts'>
const props = defineProps<{
  codeHtml: string
}>()
</script>

<template>
  <pre px-2>
    <code v-html="props.codeHtml" />
  </pre>
</template>
