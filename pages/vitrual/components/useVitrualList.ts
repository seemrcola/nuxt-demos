interface Options {
  itemHeight: number // 单个元素高度
  containerHeight: number // 容器高度
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
  const { itemHeight, containerHeight } = options
  let vitrualOffset = 0 // 滚动高度
  // 缓存长度=======================
  // todo-------------------------
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
    container.style.maxHeight = `${containerHeight}px` // 设置容器高度
    container.style.overflow = 'hidden' // 设置隐藏溢出部分

    container.addEventListener('wheel', throttle(wheelHandler, 16))
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
    const [start, end] = calcBlocks(vitrualOffset)
    // 渲染
    render(list.slice(start, end))
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
    // y 就是 vitrualOffset，即滚动高度
    // 计算渲染区间==============================================
    const start = bs(list.length)
    const end = start + renderCount
    // ========================================================
    // 计算偏移量================================================
    // 首先要理解我们找到的是下标，比如我们start是8，那么实际上找到的是第9个元素，也就是说前面有8个元素，那么我们要偏移的距离就是8个元素的高度
    // 所以这里的最大超过高度vitrualOffset的是 start * itemHeight
    const heightSum = start * itemHeight
    renderOffset.value = y - (heightSum - itemHeight)
    if (heightSum === y) // 如果刚好等于时，不需要偏移
      renderOffset.value = 0
    // ========================================================
    // console.log(`
    //   renderOffset: ${renderOffset.value},
    //   start: ${start},
    //   end: ${end},
    // `)
    return [start, end + 1]
  }

  // throttle函数实现
  function throttle(this: any, fn: Function, delay: number) {
    let timer: any = null
    return (...args: any[]) => {
      if (!timer) {
        timer = setTimeout(() => {
          fn.apply(this, args)
          timer = null
        }, delay)
      }
    }
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
