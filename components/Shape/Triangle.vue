<script setup lang='ts'>
const canvasRef = ref<HTMLCanvasElement | null>(null)
const canvasWidth = 100
const canvasHeight = 100

const state = reactive({
  color: 'orange',
})

function draw(ctx: CanvasRenderingContext2D) {
  // 定义三角形顶点的坐标
  const x1 = 50
  const y1 = 0
  const x2 = 100
  const y2 = 100
  const x3 = 0
  const y3 = 100

  // 开始路径
  ctx.beginPath()
  // 移动到第一个顶点
  ctx.moveTo(x1, y1)
  // 连接第二个顶点
  ctx.lineTo(x2, y2)
  // 连接第三个顶点
  ctx.lineTo(x3, y3)
  // 闭合路径
  ctx.closePath()
  // 设置填充颜色并填充三角形
  ctx.fillStyle = state.color
  ctx.fill()
}

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas)
    return

  const ctx = canvas.getContext('2d')
  if (!ctx)
    return

  draw(ctx)
})
</script>

<template>
  <canvas ref="canvasRef" :height="canvasHeight" :width="canvasWidth" />
</template>
