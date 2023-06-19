<script setup lang='ts'>
import type { Props } from '~/types/comp.message.d'

const props = withDefaults(defineProps<Props>(), {
  content: 'default content',
  icon: 'i-gridicons:notice-outline',
  close: true,
})

const showMessage = ref(true)
function onClose() {
  showMessage.value = false
}
</script>

<template>
  <!-- 内容 -->
  <div
    v-if="showMessage"
    class="slide-in bg-white" flex justify-between
    items-center
    min-w="240px"
    rounded-1 p-2
    shadow="md"
    absolute top="30px" left="50%"
    z-9999
    transition duration-400
  >
    <!-- 消息类型图标，通过消息类型确定，text类型不配置图标 -->
    <div v-if="props.icon">
      <div
        :class="{
          [props.icon]: true,
          'text-green-6': props.type === 'success',
          'text-red-6': props.type === 'error',
          'text-yellow-6': props.type === 'warning',
          'text-blue-6': props.type === 'info',
        }"
        h="20px" w="20px"
      />
    </div>

    <!-- 消息文本 -->
    <span v-text="props.content" />

    <!-- 手动关闭消息 -->
    <div
      v-if="props.close"
      rounded-full
      text-gray-6 cursor-pointer
      hover="bg-red-4 "
      transition duration-400
    >
      <div i-ic:outline-close @click="onClose" />
    </div>
  </div>
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
    transform: translateX(-50%);
  }
}
</style>
