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
  outerRadius: 40,
  fill: 'red',
  stroke: 'black',
  strokeWidth: 2,
}
</script>

<template>
  <v-stage :config="stageSize" centered>
    <v-layer>
      <v-star :config="starConfig" />
    </v-layer>
  </v-stage>
</template>
