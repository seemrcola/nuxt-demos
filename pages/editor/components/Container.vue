<script setup lang='ts'>
useKeyboard() // Fn功能键监听

const scale = ref(0.7)
const style = computed(() => ({
  transform: `scale(${scale.value})`,
  transformOrigin: 'top left',
}))

// 滚轮缩放
function handleMouseWheel(e: WheelEvent) {
  if (!window.$KeyboardActive.space)
    return
  if (e.deltaY > 0)
    scale.value -= 0.05
  else
    scale.value += 0.05
  // 设置上下限
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
  <div h-full w-full relative overflow-hidden text-2xl>
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
