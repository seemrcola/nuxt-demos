/* 使用konva之后这个就没必要了 */

export function useDpr(
  ctx: CanvasRenderingContext2D,
  canvasRef: HTMLCanvasElement,
  canvasWidth: number,
  canvasHeight: number) {
  // 获取设备像素比
  const dpr = window.devicePixelRatio || 1

  // 设置canvas元素的物理大小
  canvasRef.style.width = `${canvasWidth}px`
  canvasRef.style.height = `${canvasHeight}px`

  // 设置canvas元素的逻辑大小
  canvasRef.width = canvasWidth * dpr
  canvasRef.height = canvasHeight * dpr

  // 缩放
  ctx.scale(dpr, dpr)
}
