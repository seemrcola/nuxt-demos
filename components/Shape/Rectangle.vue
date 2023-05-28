<script setup lang='ts'>
// 使用canvas画一个矩形:
const stageSize = {
  width: 100,
  height: 100,
}
const squareConfig = {
  x: 0,
  y: 0,
  width: 100,
  height: 100,
  fill: 'orange',
  stroke: 'black',
  strokeWidth: 4,
}
</script>

<template>
  <v-stage :config="stageSize" centered>
    <v-layer>
      <v-rect :config="squareConfig" />
    </v-layer>
  </v-stage>
</template>
