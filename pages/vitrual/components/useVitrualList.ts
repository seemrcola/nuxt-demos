interface Options {
  itemHeight: number // 单个元素高度
  containerHeight: number // 容器高度
  buffer?: number // 缓冲个数（可选，默认为 0）
}

// ------------------------------------->--->
// -                                   ->   y
// -                                   ->-- renderOffset.value----------------->>--------------->>
// ------------------------------------- -- renderOffset.value----------------->>              -
// -                                   - -                                          containerHeight
// -                                   -                                                       -
// ------------------------------------- -                                                     -
// -                                   --------------------------------------------------------->>
// -                                   -
// -------------------------------------

// 类似无限滚动的列表，只渲染可视区域的元素，其他元素不渲染，减少渲染次数，提高性能
// 使用方法：在需要使用的组件中引入 useVitrualList，然后调用 init 方法初始化，传入参数

export function useVitrualList(list: any[], selector: string, options: Options) {
  const { itemHeight, containerHeight, buffer = 0 } = options
  let vitrualOffset = 0 // 滚动高度
  // 缓存长度=======================
  const bufferStart = 0
  const bufferEnd = 0
  // =============================
  const renderOffset = ref(0) // 渲染偏移量
  const renderList = ref<any[]>([]) // 渲染列表
  // 渲染数量
  const renderCount = Math.ceil(containerHeight / itemHeight)

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
    vitrualOffset += deltaY
    // 越界判断
    overflow(deltaY)
    // 计算渲染区间
    calcBlocks(vitrualOffset)
  }

  function overflow(deltaY: number) {
    // 当滚动到顶部时，不再向上滚动
    if (deltaY < 0 && vitrualOffset <= 0) {
      vitrualOffset = 0
      return true
    }
    // 当滚动到底部时，不再向下滚动
    if (deltaY > 0 && vitrualOffset >= (list.length - renderCount) * itemHeight) {
      vitrualOffset = (list.length - renderCount) * itemHeight
      return true
    }
    return false
  }

  function calcBlocks(y: number) {
    // 计算渲染区间==============================================
    const start = bs(list.length)
    const end = start + renderCount
    // ========================================================
    // 计算偏移量================================================
    const heightSum = start * itemHeight
    renderOffset.value = y - (heightSum - itemHeight)
    if (heightSum === y) // 如果刚好等于时，不需要偏移
      renderOffset.value = 0
    // ========================================================
    const items = list.slice(start, end + 1)
    return render(items)
  }

  // 写一个二分查找算法
  // 找到第一个大于等于 vitrualOffset 的值的下标
  function bs(len: number) {
    let left = -1
    let right = len + 1
    while (left < right - 1) {
      const mid = (left + right) >> 1
      const offset = mid * itemHeight
      if (offset > vitrualOffset)
        right = mid
      else if (offset < vitrualOffset)
        left = mid
      else
        return mid
    }
    return left + 1
  }

  function render(items: any[]) {
    renderList.value = items
  }

  const renderOffsetStyle = computed(() => {
    return {
      transform: `translateY(${-renderOffset.value}px)`,
    }
  },
  )

  function init() {
    nextTick(() => {
      initContainer()
    })
  }

  return {
    init,
    renderList,
    renderOffsetStyle,
  }
}
