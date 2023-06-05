<script setup lang='ts'>
import NMessage from '@/components/NMessage'

function show() {
  NMessage({
    content: 'default content',
    icon: 'i-gridicons:notice-outline',
    close: true,
  })
}
</script>

<template>
  <div wh-full p-2>
    <button @click="show">
      click show message
    </button>
  </div>
</template>
