<script setup lang='ts'>
// 使用konva画一个圆:
const configKonva = {
  width: 100,
  height: 100,
}
const configCircle = {
  x: 50,
  y: 50,
  radius: 48, // 半径
  fill: 'orange',
  stroke: 'black',
  strokeWidth: 2,
}
</script>

<template>
  <v-stage :config="configKonva">
    <v-layer>
      <v-circle :config="configCircle" />
    </v-layer>
  </v-stage>
</template>
