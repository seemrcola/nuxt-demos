<script setup lang='ts'>
// 专门处理一下iframe，其他的model情况再做其他处理
const props = defineProps<{
  visible: boolean
  src: string
}>()
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()
function close() {
  emit('update:visible', false)
}
</script>

<template>
  <Teleport v-if="props.visible" to="body">
    <div
      class="fade-in-out"
      style="background-color: rgba(0,0,0,0.5)"
      absolute top-0 bottom-0 left-0 right-0
      z-998
      @click="close"
    />
    <div
      class="fade-in-out"
      w="80vw" h="80vh" bg-orange-300
      absolute left="50%" top="50%" rounded-6
      transform translate-x="-50%" translate-y="-50%"
      z-999
      bc p-8
    >
      <iframe :src="props.src" w-full h-full frameborder="0" />
    </div>
  </Teleport>
</template>

<style lang="scss" scoped>
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
