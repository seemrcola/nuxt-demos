export function useDrag(domRef: Ref<any>) {
  let dragFlag = false
  let skewing: { x: number; y: number }

  function mousedownHanlder(e: MouseEvent) {
    dragFlag = true
    const { clientX, clientY } = e
    const rect = domRef.value!.getBoundingClientRect()
    const { left: preLeft, top: preTop } = rect
    skewing = { x: clientX - preLeft, y: clientY - preTop }
    document.addEventListener('mousemove', mousemoveHanlder)
    document.addEventListener('mouseup', mouseupHanlder)
  }
  function mousemoveHanlder(e: MouseEvent) {
    if (!dragFlag)
      return
    const { clientX, clientY } = e
    const { x, y } = skewing
    const offsetX = clientX - x
    const offsetY = clientY - y

    requestAnimationFrame(
      () => {
        domRef.value!.style.left = `${offsetX}px`
        domRef.value!.style.top = `${offsetY}px`
      },
    )
  }
  function mouseupHanlder() {
    dragFlag = false
    document.removeEventListener('mousemove', mousemoveHanlder)
    document.removeEventListener('mouseup', mouseupHanlder)
  }

  return {
    mousedownHanlder,
  }
}
