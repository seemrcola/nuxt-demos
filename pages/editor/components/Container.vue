<script setup lang='ts'>
import NGoast from './NGoast.vue'
import Moveable from './Moveable/index.vue'
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

// 画布拖拽
let dragFlag = false
const start = { x: 0, y: 0 }
function mousedownHandler(e: MouseEvent) {
  e.preventDefault()
  dragFlag = true
  containerTarget.value!.style.cursor = 'grabbing'
  const { clientX, clientY } = e
  start.x = clientX
  start.y = clientY
  document.addEventListener('mousemove', mousemoveHandler)
  document.addEventListener('mouseup', mouseupHandler)
}

function mousemoveHandler(e: MouseEvent) {
  if (!dragFlag || !e.shiftKey)
    return

  const { clientX, clientY } = e
  const deltaX = clientX - start.x
  const deltaY = clientY - start.y

  containerTarget.value!.scrollLeft -= deltaX
  containerTarget.value!.scrollTop -= deltaY

  start.x = clientX
  start.y = clientY
}

function mouseupHandler(e: MouseEvent) {
  dragFlag = false
  document.removeEventListener('mousemove', mousemoveHandler)
  document.removeEventListener('mouseup', mouseupHandler)
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
      ref="wrapperTarget"
      w="5000px" h="5000px"
      absolute left-0 top-0
    />
    <div
      ref="canvasTarget" class="canvas-target"
      w="1920px" h="1080px" bg="gray-100"
      absolute z-0
      :style="canvasRender.canvasStyle"
      @mousedown="mousedownHandler"
    >
      <!-- 这里又个比较麻烦的问题： -->
      <!-- 我把宽高设在了moveable组件上，但是所有的组件又自带一个宽高，导致拉伸缩放的时候改变的是moveable的宽高 -->
      <!-- fixme -->
      <Moveable
        v-for="(component, index) of canvasRender.components"
        :key="index"
        absolute flex-center
        :style="{
          ...canvasRender.componentStyle(component),
          'z-index': index,
        }"
        :info="{ index, component }"
      >
        <!-- {{ canvasRender.components }} -->
        <NGoast
          :component="component.name"
        />
      </Moveable>
    </div>
  </div>
</template>
