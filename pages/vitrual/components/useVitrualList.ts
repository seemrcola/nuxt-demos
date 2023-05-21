interface Options {
  itemHeight: number // 单个元素高度
  containerHeight: number // 容器高度
}

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
    const [start, end] = calcBlocks(0)
    render(list.slice(start, end))
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

  function calcBlocks(vitrualOffset: number) {
    // 计算渲染区间==============================================
    // 我们二分查找返回的就是第一个大于 vitrualOffset 的值的下标
    // 需要注意的是我们执行 mid * itemHeight 的时候，mid是8，则表示前8个元素的高度总和。
    const start = bs(list.length) // start * itemHeight 必定大大于 vitrualOffset，且start不代表开始下标，而是前start个元素的高度总和
    const end = start + renderCount // 计算end
    // ========================================================
    // 计算偏移量================================================
    const heightSum = start * itemHeight
    renderOffset.value = itemHeight - (heightSum - vitrualOffset)
    // ========================================================
    // console.log(`
    //   renderOffset: ${renderOffset.value},
    //   start: ${start},
    //   end: ${end},
    // `)
    // 总和处理成下标，我们做个-1
    return [start - 1, end + 1]
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
        return mid + 1
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
