interface Options {
  itemHeight: number // 单个元素高度
  containerHeight: number // 容器高度
  buffer?: number // 缓冲区
}

export function useVitrualList(list: any[], selector: string, options: Options) {
  let { itemHeight, containerHeight, buffer = 10 } = options
  const HEIGHT_SUM = list.length * itemHeight // 总高度
  const RENDER_COUNT = Math.ceil(containerHeight / itemHeight) // 渲染数量

  const renderList = ref<any[]>([])
  let offsetTop = 0
  const translateY = ref(0)
  buffer = RENDER_COUNT // 缓冲区

  function initContainer() {
    const container = document.querySelector(selector) as HTMLElement
    container.style.position = 'relative'
    container.style.overflow = 'auto'
    container.style.marginTop = '0px'
    // 生成一个填充容器
    const filled = generaterFilled()
    // 将填充容器插入到容器中
    container.appendChild(filled)
    // 监听滚动事件
    container.addEventListener('scroll', throttle(handlerScroll, 16))
  }

  function generaterFilled() {
    const filled = document.createElement('div')
    filled.style.height = `${HEIGHT_SUM}px`
    filled.style.width = '100%'
    filled.style.position = 'absolute'
    filled.style.top = '0'
    filled.style.left = '0'
    filled.style.zIndex = '-1'
    return filled
  }

  function handlerScroll(e: Event) {
    const top = (e.target as HTMLElement).scrollTop
    if (top < 0 || top > HEIGHT_SUM)
      return

    let start = 0
    let end = 0
    if (!ifFastScroll(top))
      start = Math.floor(top / itemHeight)
    else
      start = bs(list.length)
    end = start + RENDER_COUNT

    offsetTop = top
    translateY.value = top - buffer * itemHeight
    render(start, end)
  }

  function ifFastScroll(top: number) {
    // 当每次回调函数执行的时候，拖动量大于一屏加上缓冲区的时候，就认为这是一次快速滚动
    const isFastScroll = Math.abs(top - offsetTop) > (RENDER_COUNT + buffer) * itemHeight
    return isFastScroll
  }

  function render(start: number, end: number) {
    start = Math.max(start - buffer, 0)
    end = Math.min(end + buffer, list.length)
    renderList.value = list.slice(start, end)
  }

  const itemStyle = computed(() => {
    return {
      transform: `translateY(${translateY.value}px)`,
    }
  })

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

  // 实现二分查找
  // 找到第一个刚好不大于offsetTop的元素
  function bs(len: number) {
    let left = -1
    let right = len + 1
    while (left < right - 1) {
      const mid = (left + right) >> 1
      const offset = mid * itemHeight
      if (offset > offsetTop)
        right = mid
      else if (offset < offsetTop)
        left = mid
      else
        return mid
    }
    return left
  }

  function init() {
    nextTick(() => {
      initContainer()
      render(0, RENDER_COUNT)
    })
  }

  return {
    init,
    renderList,
    itemStyle,
  }
}
