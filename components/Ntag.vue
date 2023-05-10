<!-- 实现一个tooltip vue组件 -->
<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{
  text: any
}>()
const hoverTarget = ref<HTMLElement | null>(null)
const tooltipTarget = ref<HTMLElement | null>(null)

const show = ref(false)
function showTooltip() {
  show.value = true
  nextTick(() => {
    const target = hoverTarget.value!
    const tooltip = tooltipTarget.value!
    const { left, top, width, height } = target.getBoundingClientRect()
    const { height: tooltipHeight } = tooltip.getBoundingClientRect()
    // 位置处理
    tooltip.style.left = `${left + width + 4}px`
    tooltip.style.top = `${top + (height / 2) - (tooltipHeight / 2)}px`
  })
}
function hideTooltip() {
  show.value = false
}
</script>

<template>
  <div
    ref="hoverTarget"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot />
    <Teleport v-if="show" to="body">
      <div
        ref="tooltipTarget" class="tooltip"
        absolute z-100 text-sm bg-teal-600 text="white"
        max-w="200px" py-2 px-3
        rounded="5px"
      >
        {{ props.text }}
      </div>
    </Teleport>
  </div>
</template>

<style>
.tooltip {
  opacity: 0.9; /* 初始透明度为0.9 */
  animation: fade 1s ease-in-out; /* 定义动画属性 */
}
@keyframes fade {
  0% {
    opacity: 0;
  }
  70% {
    opacity: 1;
  }
  100% {
    opacity: 0.9;
  }
}
</style>
