<script setup lang='ts'>
import NGoast from './NGoast.vue'
import { BasicDescribes } from '~/components/Basic/index.describe'
import { ShapeDescribes } from '~/components/Shape/index.describe'

let dragFlag = false
let mousedownSnapshotName = ''
const currentComponent = ref('')
const style = ref({ left: '0', top: '0' })
function mousedownHandler(e: MouseEvent, name: string) {
  e.preventDefault()
  dragFlag = true
  mousedownSnapshotName = name
  document.addEventListener('mousemove', mousemoveHandler)
  document.addEventListener('mouseup', mouseupHandler)
}
function mousemoveHandler(e: MouseEvent) {
  if (!dragFlag)
    return
  currentComponent.value = mousedownSnapshotName
  const { clientX, clientY } = e
  const currentDescribe = findDiscribe(mousedownSnapshotName)
  requestAnimationFrame(() => {
    style.value = {
      left: `${clientX - currentDescribe!.w / 2}px`,
      top: `${clientY - currentDescribe!.h / 2}px`,
    }
  })
}
function mouseupHandler() {
  dragFlag = false
  currentComponent.value = ''
  mousedownSnapshotName = ''
}
function findDiscribe(name: string) {
  return [...BasicDescribes, ...ShapeDescribes].find((describe) => {
    return describe.name === name
  })
}

onUnmounted(() => {
  document.removeEventListener('mousemove', mousemoveHandler)
  document.removeEventListener('mouseup', mouseupHandler)
})
</script>

<template>
  <div>
    <Teleport to="body">
      <NGoast
        v-if="currentComponent"
        :component="currentComponent"
        absolute z-100
        :style="style"
      />
    </Teleport>
    <div>
      <div text-sm text-center b-b="1px gray dashed" py-2>
        <strong> Basic Components </strong>
      </div>
      <div flex flex-wrap justify-around p-2>
        <div
          v-for="item of BasicDescribes" :key="item.name"
          flex-center class="comp-item"
          @mousedown="mousedownHandler($event, item.name)"
        >
          <div :class="item.icon" />
        </div>
      </div>
    </div>
    <div>
      <div text-sm text-center b-b="1px gray dashed" py-2>
        <strong> Basic Shapes </strong>
      </div>
      <div flex flex-wrap justify-around p-2>
        <div
          v-for="item of ShapeDescribes" :key="item.name"
          flex-center class="comp-item"
          @mousedown="mousedownHandler($event, item.name)"
        >
          <div :class="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
  .comp-item {
    width: 45%;
    height: 25px;
    margin: 5px 0 5px 0;
    border: 1px dashed gray;
    cursor: pointer;
    transition: all .5s;
    &:hover {
      color: orange
    }
  }
</style>
