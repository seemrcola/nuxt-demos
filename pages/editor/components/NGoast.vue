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

    <ShapeStar v-if="props.component === 'ShapeStar'" />
    <ShapeLine v-if="props.component === 'ShapeLine'" />
    <ShapeBubble v-if="props.component === 'ShapeBubble'" />
    <ShapeCircle v-if="props.component === 'ShapeCircle'" />
    <ShapeTriangle v-if="props.component === 'ShapeTriangle'" />
    <ShapeRectangle v-if="props.component === 'ShapeRectangle'" />
  </div>
</template>
