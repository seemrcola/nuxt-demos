<script setup lang='ts'>
// 使用canvas画一个矩形:
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasWidth = 100
const canvasHeight = 100

const state = reactive({
  color: 'orange',
})

function dpr(ctx: CanvasRenderingContext2D) {
  // 获取设备像素比
  const dpr = window.devicePixelRatio || 1

  // 设置canvas元素的物理大小
  canvasRef.value!.style.width = `${canvasWidth}px`
  canvasRef.value!.style.height = `${canvasHeight}px`

  // 设置canvas元素的逻辑大小
  canvasRef.value!.width = canvasWidth * dpr
  canvasRef.value!.height = canvasHeight * dpr

  // 缩放
  ctx.scale(dpr, dpr)
}

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
  dpr(ctx)
  draw(ctx)
})
</script>

<template>
  <canvas ref="canvasRef" :height="canvasHeight" :width="canvasWidth" />
</template>
