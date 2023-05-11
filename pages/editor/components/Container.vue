<script setup lang='ts'>
import NGoast from './NGoast.vue'
import { useCanvasRender } from '~/store/canvasRender'

const canvasRender = useCanvasRender()
const { handleMouseWheel } = canvasRender
useKeyboard() // Fn功能键监听

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
      ref="canvasTarget" class="canvas-target"
      w="1920px" h="1080px" bg="gray-100"
      absolute z-0
      :style="canvasRender.canvasStyle"
    >
      <!-- {{ canvasRender.components }} -->
      <NGoast
        v-for="(component, index) of canvasRender.components"
        :key="index"
        :component="component.name"
        absolute
        :style="canvasRender.componentStyle(component)"
      />
    </div>
  </div>
</template>
