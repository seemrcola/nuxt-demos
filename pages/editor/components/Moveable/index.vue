<script setup lang='ts'>
import { useCanvasRender } from '~/store/canvasRender'

const props = defineProps<{
  info: { component: any; index: number }
}>()
const canvasRender = useCanvasRender()

// 选中状态
const selected = ref(false)
function clickHanlder() {
  selected.value = !selected.value
}
// 方位
const orientation = ref(['lt', 'rt', 'rb', 'lb', 't', 'r', 'b', 'l'])

// 拖动--------------------------------------------------------------
const moveLock = ref(false)
const start = { x: 0, y: 0 }
const { scale } = canvasRender

const delta = { x: 0, y: 0 }
function mousedownHandler(e: MouseEvent) {
  moveLock.value = true
  const { clientX, clientY } = e
  start.x = clientX
  start.y = clientY
  document.addEventListener('mousemove', mousemoveHandler)
  document.addEventListener('mouseup', mouseupHandler)
}
function mousemoveHandler(e: MouseEvent) {
  if (!moveLock.value)
    return

  const { clientX, clientY } = e
  delta.x = clientX - start.x
  delta.y = clientY - start.y

  const index = props.info.index
  canvasRender.components[index].left += delta.x / scale
  canvasRender.components[index].top += delta.y / scale

  start.x = clientX
  start.y = clientY
}
function mouseupHandler(e: MouseEvent) {
  moveLock.value = false
  document.removeEventListener('mousemove', mousemoveHandler)
  document.removeEventListener('mouseup', mouseupHandler)
}
// ----------------------------------------------------------------
</script>

<template>
  <div
    bc p-1
    class="moveable-wrapper"
    :class="{ selected }"
    @click="clickHanlder"
    @mousedown="mousedownHandler"
  >
    <slot />
    <template v-for="(item, index) of orientation" :key="index">
      <div
        v-if="selected"
        w-2 h-2 rounded="50%" bg-blue-400
        absolute
        :class="item"
        hover:cursor-move
      />
    </template>
  </div>
</template>

<style lang='scss' scoped>
.moveable-wrapper {
  &:hover::after {
    content: ' ';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: orange, $alpha: 0.2);
  }
}
.selected {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.3);
}
.t {
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.r {
  top: 50%;
  right: 0;
  transform: translateX(50%) translateY(-50%);
}
.b {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(50%);
}
.l {
  top: 50%;
  left: 0;
  transform: translateX(-50%) translateY(-50%);
}
.lt {
  top: 0;
  left: 0;
  transform: translateX(-50%) translateY(-50%);
}
.rt {
  top: 0;
  right: 0;
  transform: translateX(50%) translateY(-50%);
}
.rb {
  bottom: 0;
  right: 0;
  transform: translateX(50%) translateY(50%);
}
.lb {
  bottom: 0;
  left: 0;
  transform: translateX(-50%) translateY(50%);
}
</style>
