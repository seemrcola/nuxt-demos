<script setup lang='ts'>
const props = defineProps<{
  component: string
}>()
</script>

<template>
  <div>
    <BasicButton v-if="props.component === 'BasicButton'" />
    <BasicCard v-if="props.component === 'BasicCard'" />
    <BasicText v-if="props.component === 'BasicText'" />
    <BasicImage v-if="props.component === 'BasicImage'" />
  </div>
</template>
