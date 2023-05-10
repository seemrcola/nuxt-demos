<script setup lang='ts'>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div btn>
    {{ $props.text }}
  </div>
</template>
