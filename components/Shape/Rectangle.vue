<script setup lang='ts'>
// 使用canvas画一个矩形:
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasWidth = 100
const canvasHeight = 100

const state = reactive({
  color: 'orange',
})

function draw(ctx: CanvasRenderingContext2D) {
  ctx.fillStyle = state.color
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas)
    return

  const ctx = canvas.getContext('2d')
  if (!ctx)
    return
  useDpr(ctx, canvas, canvasWidth, canvasHeight)
  draw(ctx)
})
</script>

<template>
  <canvas ref="canvasRef" :height="canvasHeight" :width="canvasWidth" />
</template>
