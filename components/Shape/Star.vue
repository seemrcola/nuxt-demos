<script setup lang='ts'>
const stageSize = {
  width: 100,
  height: 100,
}
const starConfig = {
  x: 50,
  y: 50,
  numPoints: 5,
  innerRadius: 20,
  outerRadius: 50,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 2,
}
</script>

<template>
  <v-stage :config="stageSize">
    <v-layer>
      <v-star :config="starConfig" />
    </v-layer>
  </v-stage>
</template>
