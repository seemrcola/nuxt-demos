<script lang="ts" setup>
const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

function close() {
  emit('update:visible', false)
}
</script>

<template>
  <teleport to="body">
    <div
      v-if="props.visible"
      style="background-color: rgba(0,0,0,0.5)"
      absolute z-9999
      wh-full
      @click="close"
    >
      <div
        class="slide-in"
        absolute top-0 bottom-0 right-0 z-9999
        bg="white"
        w="80%" max-w="400px"
        @click.stop
      >
        <slot />
      </div>
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
</style>
