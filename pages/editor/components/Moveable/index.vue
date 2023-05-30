<script setup lang='ts'>
import { useCanvasRender } from '~/store/canvasRender'

const props = defineProps<{
  info: { component: any; index: number }
}>()

const canvasRender = useCanvasRender()

// 选中状态
const selected = ref(false)
function clickHanlder(e: MouseEvent) {
  e.stopPropagation()
  selected.value = true
}
// 点击任意非选中区域，取消选中状态
document.addEventListener('click', () => {
  selected.value = false
})

// 方位
type Orientation = 'lt' | 'rt' | 'rb' | 'lb' | 't' | 'r' | 'b' | 'l'
const orientation: Orientation[] = ['lt', 'rt', 'rb', 'lb', 't', 'r', 'b', 'l']

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

// 缩放------------------------------------------------------------
const scaleLock = ref(false)
const startScale = { x: 0, y: 0 }
const deltaScale = { x: 0, y: 0 }
let scaleItem = ''
function mousedownScaleHandler(e: MouseEvent, item: string) {
  scaleLock.value = true
  const { clientX, clientY } = e
  startScale.x = clientX
  startScale.y = clientY
  scaleItem = item
  document.addEventListener('mousemove', mousemoveScaleHandler)
  document.addEventListener('mouseup', mouseupScaleHandler)
}
function mousemoveScaleHandler(e: MouseEvent) {
  if (!scaleLock.value)
    return
  const { clientX, clientY } = e
  deltaScale.x = clientX - startScale.x
  deltaScale.y = clientY - startScale.y

  const index = props.info.index
  // 拖拽不同的点的时候，我们要改变的component的属性不同
  // 当拖拽含有l的点的时候，我们要改变的是left和width
  // 当拖拽含有t的点的时候，我们要改变的是top和height
  // 当拖拽含有r的点的时候，我们要改变的是width
  // 当拖拽含有b的点的时候，我们要改变的是height
  if (scaleItem.includes('l')) {
    canvasRender.components[index].left += deltaScale.x / scale
    canvasRender.components[index].w -= deltaScale.x / scale
  }
  if (scaleItem.includes('t')) {
    canvasRender.components[index].top += deltaScale.y / scale
    canvasRender.components[index].h -= deltaScale.y / scale
  }
  if (scaleItem.includes('r'))
    canvasRender.components[index].w += deltaScale.x / scale

  if (scaleItem.includes('b'))
    canvasRender.components[index].h += deltaScale.y / scale

  startScale.x = clientX
  startScale.y = clientY
}
function mouseupScaleHandler(e: MouseEvent) {
  scaleLock.value = false
  document.removeEventListener('mousemove', mousemoveScaleHandler)
  document.removeEventListener('mouseup', mouseupScaleHandler)
}
// ----------------------------------------------------------------
</script>

<template>
  <div
    bc
    :class="{ selected, 'moveable-wrapper': !selected }"
    @click="clickHanlder"
    @mousedown="mousedownHandler"
  >
    <slot />
    <template v-for="(item, index) of orientation" :key="index">
      <div
        v-if="selected"
        w="10px" h="10px" rounded-1 bg-blue-400
        absolute
        :class="item"
        class="bigger"
        hover:cursor-move
        @mousedown.stop="($event) => mousedownScaleHandler($event, item)"
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
    background-color: rgba($color: red, $alpha: 0.2);
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
.bogger {
  &::after {
    content: ' ';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-color: rgba($color: red, $alpha: 0.2);
  }
}
</style>
