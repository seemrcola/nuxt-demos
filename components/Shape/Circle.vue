<script setup lang='ts'>
// 使用canvas画一个圆:
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasWidth = 100
const canvasHeight = 100

const state = reactive({
  circleRadius: 50,
  circleColor: 'blue',
})

function drawCircle(ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.arc(
    canvasWidth / 2,
    canvasHeight / 2,
    state.circleRadius,
    0,
    2 * Math.PI,
  )
  ctx.fillStyle = state.circleColor
  ctx.fill()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas)
    return

  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  drawCircle(ctx)
})
</script>

<template>
  <canvas :height="canvasHeight" :width="canvasWidth" />
</template>
