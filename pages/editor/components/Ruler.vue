<script setup lang='ts'>
// todo 写一个鼠标hover的功能，用于显示鼠标所在位置的坐标
// todo 目前只做了基础版本的x轴坐标
import { useCanvasRender } from '~/store/canvasRender'

const canvasRender = useCanvasRender()

const rulerXRef = ref<HTMLElement | null>(null)
const showTipX = ref(false)
const rulerX = ref('0')
const tipXRef = ref<HTMLElement | null>(null)
function mosueEnterHandler(e: MouseEvent) {
  showTipX.value = true
  nextTick(() => {
    const { clientX, clientY } = e
    rulerXTransform(clientX, clientY)
  })
}
function mouseMoveHandler(e: MouseEvent) {
  const { clientX, clientY } = e
  rulerXTransform(clientX, clientY)
}
function mouseLeaveHandler() {
  showTipX.value = false
}
function rulerXTransform(clientX: number, clientY: number) {
  const rect = rulerXRef.value!.getBoundingClientRect()
  const { left } = rect
  const scale = canvasRender.scale
  rulerX.value = `${~~((clientX - left) / scale)}`
  tipXRef.value!.style.left = `${clientX}px`
  tipXRef.value!.style.top = `${clientY + 12}px`
}
</script>

<template>
  <div wh-full relative>
    <div
      id="ruler-x"
      ref="rulerXRef"
      h="14px" w-full
      absolute left-0 right-0
      bg="#fafafa"
      z-1
      @mouseenter="mosueEnterHandler"
      @mousemove="mouseMoveHandler"
      @mouseleave="mouseLeaveHandler"
    />
    <div
      id="ruler-y"
      w="14px" h-full
      absolute left-0 right-0
      bg="#fafafa"
      z-1
    />
    <Teleport v-if="showTipX" to="body">
      <div
        ref="tipXRef"
        class="tip"
        absolute px-2 py-1 text-xs bg-black text-white rounded
      >
        {{ rulerX }}
      </div>
    </Teleport>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
$color-main: #ccc;
#ruler-x{
  background-image: repeating-linear-gradient(90deg, $color-main 0, $color-main 1.5px, transparent 0, transparent .5cm);
  background-position: .5cm 0;
  background-repeat: no-repeat;
  background-size: 100% 5px;
}
</style>
