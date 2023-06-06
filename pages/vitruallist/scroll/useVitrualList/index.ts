import { calcDynamicStartEnd, initAllListDesc, updateDesc } from './dynamic'
import { FILLED_INDEX, FILLED_NAME } from './constants'

interface Options {
  itemHeight: number // 单个元素高度
  containerHeight: number // 容器高度
  dynamic?: boolean // 是否动态高度
}

export function useVitrualList(list: any[], selector: string, options: Options) {
  let { itemHeight, containerHeight, dynamic = false } = options
  if (dynamic) // 由于用户可能会传一个过大的高度，我们这里做个限制，写死30
    itemHeight = 30
  const HEIGHT_SUM = list.length * itemHeight // 总高度
  const RENDER_COUNT = Math.ceil(containerHeight / itemHeight) // 渲染数量

  const renderList = ref<any[]>([])
  const translateY = ref(0)
  const BUFFER = RENDER_COUNT > 15 ? 15 : RENDER_COUNT // 缓冲区设置个最大值

  const dynamicListDesc = ref<any[]>([])
  const dynamicList = ref<any[]>([])
  let filledEl: HTMLElement

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

    filled.className = FILLED_NAME

    filled.style.height = `${HEIGHT_SUM}px`
    filled.style.width = '100%'
    filled.style.position = 'absolute'
    filled.style.top = '0'
    filled.style.left = '0'
    filled.style.zIndex = '-1'
    filled.dataset.index = FILLED_INDEX

    filledEl = filled
    return filled
  }

  function handlerScroll(e: Event) {
    const top = (e.target as HTMLElement).scrollTop

    if (dynamic)
      scroll4Dynamic(top)
    else
      scroll4Static(top)
  }

  function scroll4Static(top: number) {
    const start = Math.floor(top / itemHeight)
    const end = start + RENDER_COUNT + 1
    render(start, end)
  }

  function scroll4Dynamic(top: number) {
    const [start, end] = calcDynamicStartEnd(dynamicListDesc, top, containerHeight)
    renderDynamic(start, end + 1) // 因为slice是左闭右开的，所以这里做个+1
  }

  function renderDynamic(start: number, end: number) {
    start = Math.max(start - BUFFER, 0)
    end = Math.min(end + BUFFER, list.length)
    translateY.value = dynamicListDesc.value[start].top
    dynamicList.value = dynamicListDesc.value.slice(start, end)
  }

  function render(start: number, end: number) {
    start = Math.max(start - BUFFER, 0)
    end = Math.min(end + BUFFER, list.length)
    translateY.value = start * itemHeight
    renderList.value = list.slice(start, end)
  }

  // 处理偏移
  const itemStyle = computed(() => {
    return `
      transform: translateY(${translateY.value}px);
      box-sizing: border-box;
      border-bottom: none; 
    `
  })

  onUpdated(() => {
    const container = document.querySelector(selector) as HTMLElement
    updateDesc(
      dynamic,
      container,
      filledEl,
      dynamicListDesc,
    )
  })

  function init() {
    // 动态高度
    if (dynamic) {
      dynamicListDesc.value = initAllListDesc(list, itemHeight)
      renderDynamic(0, RENDER_COUNT)
    }
    // 定高
    else {
      render(0, RENDER_COUNT)
    }

    nextTick(() => {
      initContainer()
    })
  }

  return {
    init,
    renderList,
    dynamicList,
    itemStyle,
  }
}
