interface Options {
  itemHeight: number // 单个元素高度
  containerHeight: number // 容器高度
}

export function useVitrualList(list: any[], selector: string, options: Options) {
  const { itemHeight, containerHeight } = options
  const HEIGHT_SUM = list.length * itemHeight // 总高度
  const RENDER_COUNT = Math.ceil(containerHeight / itemHeight) // 渲染数量

  function initContainer() {
    const container = document.querySelector(selector) as HTMLElement
  }
}
