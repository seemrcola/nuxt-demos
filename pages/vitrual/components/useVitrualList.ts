interface Options {
  itemHeight: number // 单个元素高度（如果高度确定的话，这个高度填一个最小高度即可）
  containerHeight: number // 容器高度
}

export function useVitrualList(list: any[], selector: string, options: Options) {
  const { itemHeight, containerHeight } = options
  let y = 0
  const renderList = ref<any[]>([])

  function initContainer() {
    const container = document.querySelector(selector) as HTMLElement

    if (!container)
      return
    container.style.position = 'relative' // 设置为相对定位
    container.style.height = `${containerHeight}px` // 设置容器高度
    container.style.overflow = 'hidden' // 设置隐藏溢出部分

    container.addEventListener('wheel', wheelHandler)
    renderList.value = list
    calcBlocks(0)
  }

  function wheelHandler(e: WheelEvent) {
    e.preventDefault()
    const { deltaY } = e
    y += deltaY
    calcBlocks(y)
  }

  function calcBlocks(y: number) {
    const start = Math.floor(y / itemHeight)
    const end = start + Math.ceil(containerHeight / itemHeight)
    const items = list.slice(start, end)
    render(items)
  }

  function render(items: any[]) {
    renderList.value = items
  }

  function init() {
    nextTick(() => {
      initContainer()
    })
  }

  return {
    init,
    renderList,
  }
}
