<script setup lang='ts'>
const textarea = ref<HTMLElement | null>(null)

function focus() {
  textarea.value!.focus()
}
</script>

<template>
  <div w="300px" h="200px" p-2>
    <textarea
      ref="textarea" wh-full resize="none"
      @click="focus"
    />
  </div>
</template>
