<script setup lang='ts'>
import { useCanvasRender } from '~/store/canvasRender'

const canvasRender = useCanvasRender()

// 拖拽排序效果实现
const dragIndex = ref(-1)
const dragOverIndex = ref(-1)
function dragHandler(index: number, e: DragEvent) {
  e.preventDefault()
  dragIndex.value = index
}
function dragoverHandler(index: number, e: DragEvent) {
  e.preventDefault()
  dragOverIndex.value = index
}
function dragendHandler(index: number, e: DragEvent) {
  e.preventDefault()
  // 交换位置
  const dragItem = canvasRender.components[dragIndex.value]
  const dragOverItem = canvasRender.components[dragOverIndex.value]
  canvasRender.components[dragIndex.value] = dragOverItem
  canvasRender.components[dragOverIndex.value] = dragItem
  // 重置
  dragIndex.value = -1
  dragOverIndex.value = -1
}
</script>

<template>
  <div wh-full>
    <div h="36px" font-700 flex-center b-b="1px dashed gray">
      Layers
    </div>
    <div max-h="600px" overflow-auto b-b="1px dashed gray">
      <div
        v-for="(item, index) of canvasRender.components" :key="index"
        h="42px"
        flex items-center relative
        px-1
        b-b="1px dashed gray"
        hover:bg-orange
        cursor-pointer
        draggable="true"
        transition duration-400
        :class="{ dtagover: index === dragOverIndex }"
        @drag="e => dragHandler(index, e)"
        @dragover="e => dragoverHandler(index, e)"
        @dragend="e => dragendHandler(index, e)"
      >
        <div :class="`${item.icon}`" />
        <div flex-1 px-4 text-sm>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dtagover{
  &::before {
    content: "SWAP";
    font-size: 12px;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: orange;
    opacity: 0.6;
  }
}
</style>
