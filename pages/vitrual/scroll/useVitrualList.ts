interface Options {
  itemHeight: number // 单个元素高度
  containerHeight: number // 容器高度
  buffer?: number // 缓冲区
}

export function useVitrualList(list: any[], selector: string, options: Options) {
  let { itemHeight, containerHeight, buffer = 0 } = options
  const HEIGHT_SUM = list.length * itemHeight // 总高度
  const RENDER_COUNT = Math.ceil(containerHeight / itemHeight) // 渲染数量

  const renderList = ref<any[]>([])
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
    container.addEventListener('scroll', handlerScroll)
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
    // console.log('scroll')
    const top = (e.target as HTMLElement).scrollTop
    if (top < 0 || top > HEIGHT_SUM)
      return

    const start = Math.floor(top / itemHeight)
    const end = start + RENDER_COUNT + 1
    render(start, end)
  }

  function render(start: number, end: number) {
    requestAnimationFrame(() => {
      start = Math.max(start - buffer, 0)
      end = Math.min(end + buffer, list.length)
      translateY.value = start * itemHeight
      renderList.value = list.slice(start, end)
    })
  }

  // 处理偏移
  const itemStyle = computed(() => {
    return {
      transform: `translateY(${translateY.value}px)`,
    }
  })

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
