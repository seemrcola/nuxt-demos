<script setup lang='ts'>
import NGoast from './NGoast.vue'
import { useCanvasRender } from '~/store/canvasRender'

const canvasRender = useCanvasRender()
const { handleMouseWheel } = canvasRender
useKeyboard() // Fn功能键监听

const canvasTarget = ref<HTMLElement | null>(null)
const wrapperTarget = ref<HTMLElement | null>(null)
const containerTarget = ref<HTMLElement | null>(null)

function midpoint() {
  const warpperRect = wrapperTarget.value?.getBoundingClientRect()
  const canvasRect = canvasTarget.value?.getBoundingClientRect()
  if (warpperRect && canvasRect) {
    const { width: wW, height: wH } = warpperRect
    const { width: cW, height: cH } = canvasRect
    const x = (wW - cW) / 2
    const y = (wH - cH) / 2
    return { x, y }
  }
  return { x: 0, y: 0 }
}

onMounted(() => {
  canvasTarget.value!.addEventListener('wheel', handleMouseWheel)
  const { x, y } = midpoint()
  containerTarget.value!.scrollLeft = x
  containerTarget.value!.scrollTop = y
  canvasTarget.value!.style.left = `${x}px`
  canvasTarget.value!.style.top = `${y}px`
})
onUnmounted(() => {
  canvasTarget.value?.removeEventListener('wheel', handleMouseWheel)
})
</script>

<template>
  <div
    ref="containerTarget"
    h-full w-full relative
    overflow-auto
  >
    <div
      ref="wrapperTarget" w="5000px" h="5000px"
      absolute left-0 top-0
    />
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
