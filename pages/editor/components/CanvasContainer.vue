<script setup lang='ts'>
useKeyboard()

const scale = ref(0.7)
const style = computed(() => ({
  transform: `scale(${scale.value})`,
  transformOrigin: 'top left',
}))

// 实现一个鼠标滚动缩放的功能
function handleMouseWheel(e: WheelEvent) {
  if (e.deltaY > 0)
    scale.value -= 0.05
  else
    scale.value += 0.05
  // 设置缩放上限
  scale.value = Math.max(0.5, scale.value)
  scale.value = Math.min(3, scale.value)
}

const canvasTarget = ref<HTMLElement | null>(null)
onMounted(() => {
  canvasTarget.value?.addEventListener('wheel', handleMouseWheel)
})
onUnmounted(() => {
  canvasTarget.value?.removeEventListener('wheel', handleMouseWheel)
})
</script>

<template>
  <div h-full w-full relative overflow-hidden>
    <div
      ref="canvasTarget"
      w="1920px" h="1080px" bg="gray-100"
      absolute z-0
      :style="style"
    >
      hello world
    </div>
  </div>
</template>
