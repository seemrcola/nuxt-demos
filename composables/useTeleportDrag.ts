/*
* 注意：将需要drag的元素telleport到body下, 传入dom即可实现拖拽
*/
import type { UseDragResult } from './types/useTeleportDrag.d'

export function useTeleportDrag(domRef: Ref<any>): UseDragResult {
  const dragFlag = ref(false)
  let skewing: { x: number; y: number }

  function mousedownHanlder(e: MouseEvent) {
    dragFlag.value = true
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
    dragFlag.value = false
    document.removeEventListener('mousemove', mousemoveHanlder)
    document.removeEventListener('mouseup', mouseupHanlder)
  }

  return {
    mousedownHanlder,
    dragFlag,
  }
}
