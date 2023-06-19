<script setup lang='ts'>
function show() {
  useMessage({
    content: 'default content',
    icon: 'i-gridicons:notice-outline',
    close: true,
  })
}
</script>

<template>
  <div wh-full p-2>
    <button @click="show">
      click show message
    </button>
    <div flex flex-col max-h="400px" overflow-auto>
      <div h="5000px" />
    </div>
  </div>
</template>
