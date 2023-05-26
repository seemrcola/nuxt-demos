import { scrollWrapper as scrollWrapperFn, scrollbar as scrollbarFn } from './scrollbar'
import { throttle } from './utils'

interface Options {
  itemHeight: number // 单个元素高度
  containerHeight: number // 容器高度
  scrollbar?: boolean // 是否显示滚动条
  throttleTime?: number // 节流时间
}

export function useVitrualList(list: any[], selector: string, options: Options) {
  // 滚动相关变量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const { itemHeight, containerHeight, throttleTime = 0 } = options
  let vitrualOffset = 0 // 滚动高度
  const renderOffset = ref(0) // 渲染偏移量
  const renderList = ref<any[]>([]) // 渲染列表
  const RENDER_COUNT = Math.ceil(containerHeight / itemHeight) // 渲染数量

  // 滚动条相关变量>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  const { scrollbar = false } = options // 是否显示滚动条
  let moveLock = false // 滚动条移动锁
  let startY = 0 // 鼠标按下时的位置
  let deltaY = 0 // 鼠标移动的距离
  let barHeight = 0 // 滚动条高度
  let ratio = 0 // 滚动条高度与容器高度的比值
  const scrollbarRef = ref<HTMLElement | null>(null) // 滚动条ref

  // =====================================滚动相关================================================================
  function initContainer() {
    const container = document.querySelector(selector) as HTMLElement

    if (!container)
      return
    container.style.position = 'relative' // 设置为相对定位
    container.style.height = `${containerHeight}px` // 设置容器高度
    container.style.maxHeight = `${containerHeight}px` // 设置容器高度
    container.style.overflow = 'hidden' // 设置隐藏溢出部分

    container.addEventListener('wheel', throttle(wheelHandler, throttleTime))
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
    // 滚动条位置变更=========================================
    const top = transformVitrualToCssTop(vitrualOffset)
    scrollbarRef.value!.style.top = `${top}px`
  }

  function overflow(deltaY: number) {
    // 当滚动到顶部时，不再向上滚动
    if (deltaY < 0 && vitrualOffset <= 0) {
      vitrualOffset = 0
      return true
    }
    // 当滚动到底部时，不再向下滚动
    if (deltaY > 0 && vitrualOffset >= (list.length - RENDER_COUNT) * itemHeight) {
      vitrualOffset = (list.length - RENDER_COUNT) * itemHeight
      return true
    }
    return false
  }

  function calcBlocks(vitrualOffset: number) {
    // 计算渲染区间
    // 我们二分查找返回的就是第一个大于 vitrualOffset 的值的下标
    // 需要注意的是我们执行 mid * itemHeight 的时候，mid是8，则表示前8个元素的高度总和。
    // const start = bs(list.length, vitrualOffset, itemHeight) // start * itemHeight 必定大大于 vitrualOffset，且start不代表开始下标，而是前start个元素的高度总和
    // 这里没必要二分，不做动态高度的情况下，直接计算即可，依然还是找到大于等于 vitrualOffset 的item的总个数
    let start = Math.ceil(vitrualOffset / itemHeight)
    if (start === 0)
      start = 1
    const end = start + RENDER_COUNT

    // 计算偏移量
    const heightSum = start * itemHeight
    renderOffset.value = itemHeight - (heightSum - vitrualOffset)

    // 总个数处理成下标，我们要做个-1
    return [start - 1, end + 1]
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
  // ======================================================滚动相关end======================================================

  // ======================================================模拟滚动条========================================================

  function generateScrollbar() {
    const heightSum = list.length * itemHeight
    let barH = (containerHeight / heightSum) * containerHeight
    if (barH < 15) // 给订一个最小高度
      barH = 15
    barHeight = barH

    const scrollbarDom = scrollbarFn(barH)
    scrollbarRef.value = scrollbarDom
    return scrollbarDom
  }

  function generateScrollbarWrapper() {
    const wrapper = scrollWrapperFn(containerHeight)
    return wrapper
  }

  function initScrollbar() {
    const scrollbar = generateScrollbar()
    const wrapper = generateScrollbarWrapper()
    nextTick(() => {
      wrapper.appendChild(scrollbar)
      const container = document.querySelector(selector) as HTMLElement
      container.appendChild(wrapper)
      scrollbar.addEventListener('mousedown', scrollbarMouseDownHandler)
    })
  }

  function scrollbarMouseDownHandler(e: MouseEvent) {
    e.preventDefault()
    moveLock = true
    const { clientY } = e
    startY = clientY
    document.addEventListener('mousemove', scrollbarMouseMoveHandler)
    document.addEventListener('mouseup', scrollbarMouseUpHandler)
  }

  function scrollbarMouseMoveHandler(e: MouseEvent) {
    if (!moveLock)
      return
    const { clientY } = e
    deltaY = clientY - startY
    startY = clientY
    // 滚动条的移动距离
    const top = parseInt(scrollbarRef.value!.style.top)
    const cssTop = top + deltaY // 滚动条的css top值
    const finalCssTop = cssOverflow(cssTop) // 滚动条的css top值经过处理后的值
    scrollbarRef.value!.style.top = `${finalCssTop}px`

    // 滚动条移动的距离，转换成列表移动的距离，需要乘以一个比例
    transformCssTopToVitrualOffset(finalCssTop)
    // 根据偏移量，计算出列表的下标，然后渲染列表=========
    const [start, end] = calcBlocks(vitrualOffset)
    render(list.slice(start, end))
  }

  function scrollbarMouseUpHandler(e: MouseEvent) {
    moveLock = false
    document.removeEventListener('mousemove', scrollbarMouseMoveHandler)
    document.removeEventListener('mouseup', scrollbarMouseUpHandler)
  }

  function cssOverflow(cssTop: number) {
    // 滚动条css top小于0，表示滚动到顶部了
    if (cssTop < 0)
      cssTop = 0
    // 滚动条css top大于容器高度减去滚动条高度，表示滚动到底部了
    if (cssTop > containerHeight - barHeight)
      cssTop = containerHeight - barHeight
    return cssTop
  }

  // ========================================================================================================================

  // ===========================================公用==========================================
  function transformCssTopToVitrualOffset(cssTop: number) {
    // 滚动条的css top值，转换成列表的偏移量
    vitrualOffset = cssTop * ratio
    renderOffset.value = vitrualOffset
  }

  function transformVitrualToCssTop(vitrualOffset: number) {
    // 列表的偏移量，转换成滚动条的css top值
    const cssTop = vitrualOffset / ratio
    return cssTop
  }
  // ==================================================================================

  function init() {
    nextTick(() => {
      if (scrollbar) {
        // 初始化滚动条
        initScrollbar()
        // 计算滚动条和列表的比例
        const listHeight = list.length * itemHeight - containerHeight
        const scrollHeight = containerHeight - barHeight
        ratio = listHeight / scrollHeight
      }
      initContainer()
    })
  }

  return {
    init,
    renderList,
    renderOffsetStyle,
  }
}
