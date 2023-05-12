<script setup lang='ts'>
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
  // 定义五角星的外接圆半径和顶点坐标
  const R = 50
  const x = 50
  const y = 50
  const angle = Math.PI * 2 / 5 // 五角星每个角度的弧度值
  const starVertices = []

  // 计算五角星顶点坐标
  for (let i = 0; i < 5; i++) {
    starVertices.push({
      x: x + R * Math.cos(angle * i - Math.PI / 2),
      y: y + R * Math.sin(angle * i - Math.PI / 2),
    })
    starVertices.push({
      x: x + R / 2 * Math.cos(angle * i + angle / 2 - Math.PI / 2),
      y: y + R / 2 * Math.sin(angle * i + angle / 2 - Math.PI / 2),
    })
  }

  // 开始路径
  ctx.beginPath()
  // 移动到第一个顶点
  ctx.moveTo(starVertices[0].x, starVertices[0].y)
  // 连接其他顶点
  for (let i = 1; i < starVertices.length; i++)
    ctx.lineTo(starVertices[i].x, starVertices[i].y)

  // 闭合路径
  ctx.closePath()
  // 设置填充颜色并填充五角星
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
  dpr(ctx)
  draw(ctx)
})
</script>

<template>
  <canvas ref="canvasRef" :height="canvasHeight" :width="canvasWidth" />
</template>
