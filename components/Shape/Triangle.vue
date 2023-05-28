<script setup lang='ts'>
const stageSize = {
  width: 100,
  height: 100,
}
const triangleConfig = {
  points: [0, 100, 50, 0, 100, 100],
  fill: 'orange',
  closed: true,
  stroke: 'black',
  strokeWidth: 0,
}
</script>

<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-line :config="triangleConfig" />
    </v-layer>
  </v-stage>
</template>
