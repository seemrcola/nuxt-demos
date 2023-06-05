<script setup lang='ts'>
import { useMessageKey } from '~/provider.keys'

const useMessage = inject(useMessageKey)!
function show() {
  useMessage({
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
