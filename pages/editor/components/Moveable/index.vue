<script setup lang='ts'>
const selected = ref(false)
const moveableTarget = ref<HTMLElement | null>(null)

onMounted(() => {
  moveableTarget.value!.addEventListener('click', () => {
    selected.value = !selected.value
  })
})
</script>

<template>
  <div
    ref="moveableTarget"
    :class="{ clicked: selected }"
  >
    <!-- <slot /> -->
  </div>
</template>

<style lang="scss" scoped>
.clicked {
  border: 1px solid #409eff;
}
</style>
