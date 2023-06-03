<script lang="ts" setup>
const props = defineProps<{
  visible: boolean // 是否显示
  width: string | number // 宽度
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const width = props.width || 500
const widthStyle = `width: ${width}px`

function close() {
  emit('update:visible', false)
}
</script>

<template>
  <teleport v-if="props.visible" to="body">
    <div
      class="fade-in-out"
      style="background-color: rgba(0,0,0,0.5)"
      absolute top-0 bottom-0 left-0 right-0 z-9999
      @click="close"
    />
    <div
      class="slide-in"
      absolute top-0 bottom-0 right-0 z-9999
      bg="white"
      w="80%"
      :style="widthStyle"
    >
      <slot />
    </div>
  </teleport>
</template>

<style scoped>
.slide-in {
  animation: slideIn 0.4s forwards;
}
@keyframes slideIn {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
.fade-in-out{
  animation: fadeInOut 0.4s ease-in-out;
}
@keyframes fadeInOut {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;
  }
}
</style>
