export function useMove() {
  // 按住拖拽
  const moveLock = ref(false)
  const start = { x: 0, y: 0 }

  const delta = { x: 0, y: 0 }
  function mousedownHandler(e: MouseEvent) {
    moveLock.value = true
    const { clientX, clientY } = e
    start.x = clientX
    start.y = clientY
    document.addEventListener('mousemove', mousemoveHandler)
    document.addEventListener('mouseup', mouseupHandler)
  }
  function mousemoveHandler(e: MouseEvent) {
    if (!moveLock.value)
      return

    const { clientX, clientY } = e
    delta.x = clientX - start.x
    delta.y = clientY - start.y

    start.x = clientX
    start.y = clientY
  }
  function mouseupHandler(e: MouseEvent) {
    moveLock.value = false
    document.removeEventListener('mousemove', mousemoveHandler)
    document.removeEventListener('mouseup', mouseupHandler)
  }

  function getDelta() {
    return { ...delta }
  }

  return {
    mousedownHandler,
    delta,
    getDelta,
  }
}
