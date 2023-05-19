interface Options {
  itemHeight: number // 单个元素高度（如果高度确定的话，这个高度填一个最小高度即可）
  containerHeight: number // 容器高度
  buffer?: number // 缓冲个数（可选，默认为 0）
}

// 类似无限滚动的列表，只渲染可视区域的元素，其他元素不渲染，减少渲染次数，提高性能
// 使用方法：在需要使用的组件中引入 useVitrualList，然后调用 init 方法初始化，传入参数
export function useVitrualList(list: any[], selector: string, options: Options) {
  const { itemHeight, containerHeight, buffer = 0 } = options
  let y = 0
  // 缓存长度=======================
  let bufferStart = 0
  let bufferEnd = 0
  // =============================
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
    // 越界判断
    overflow(deltaY)
    // 计算渲染区间
    calcBlocks(y)
  }

  function overflow(deltaY: number) {
    // 当滚动到顶部时，不再向上滚动
    if (deltaY < 0 && y <= 0)
      y = 0

    // 当滚动到底部时，不再向下滚动
    if (deltaY > 0 && y >= itemHeight * list.length)
      y = itemHeight * list.length
  }

  function calcBlocks(y: number) {
    const start = Math.floor(y / itemHeight)
    const end = start + Math.ceil(containerHeight / itemHeight)
    // 当在缓冲区区间时，不重新渲染
    if (start < bufferStart || end > bufferEnd) {
      // 计算buffer====================================
      bufferStart = Math.max(start - buffer, 0)
      bufferEnd = Math.min(end + buffer, list.length)
      // ==============================================
      const items = list.slice(bufferStart, bufferEnd)
      return render(items)
    }
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
