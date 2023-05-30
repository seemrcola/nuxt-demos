<script setup lang='ts'>
const props = defineProps<{
  component: string
}>()
</script>

<template>
  <!-- Basic -->
  <BasicButton v-if="props.component === 'BasicButton'" />
  <BasicCard v-else-if="props.component === 'BasicCard'" />
  <BasicText v-else-if="props.component === 'BasicText'" />
  <BasicImage v-else-if="props.component === 'BasicImage'" />
  <!-- Shape -->
  <ShapeStar v-else-if="props.component === 'ShapeStar'" />
  <ShapeLine v-else-if="props.component === 'ShapeLine'" />
  <ShapeBubble v-else-if="props.component === 'ShapeBubble'" />
  <ShapeCircle v-else-if="props.component === 'ShapeCircle'" />
  <ShapeTriangle v-else-if="props.component === 'ShapeTriangle'" />
  <ShapeRectangle v-else-if="props.component === 'ShapeRectangle'" />
  <!-- Toys -->
  <ToysLifegame v-else-if="props.component === 'ToysLifegame'" />
  <ToysMines v-else-if="props.component === 'ToysMines'" />
  <ToysPlums v-else-if="props.component === 'ToysPlums'" />
  <ToysVirus v-else-if="props.component === 'ToysVirus'" />
</template>
