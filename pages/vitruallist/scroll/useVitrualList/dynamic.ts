import { bs } from './utils'
import { FILLED_INDEX } from './constants'

export function updateDesc(
  dynamic: boolean,
  containerEl: HTMLElement,
  filledEl: HTMLElement,
  dynamicListDesc: Ref<any[]>,
) {
  if (!dynamic)
    return 'no need to update'
  if (!containerEl)
    return console.error('item-container is null')

  const children = containerEl.children
  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement
    // 拿到当前项的索引
    const index = child.dataset.index

    // 跳过填充项
    if (index === FILLED_INDEX)
      continue

    if (index === undefined)
      throw new Error('data-index is undefined')
    // 拿到当前项的描述
    const desc = dynamicListDesc.value[+index]
    // 获取当前child的实际高度
    const { height: realHeight } = child.getBoundingClientRect()
    // 计算高度差 , 真实高度减去默认高度
    const diff = realHeight - desc.height
    // 如果高度差不为0，需要更新后续所有项的top和bottom
    if (diff !== 0) {
      desc.height = realHeight
      desc.bottom = desc.bottom + diff
      for (let j = +index + 1; j < dynamicListDesc.value.length; j++) {
        dynamicListDesc.value[j].top = dynamicListDesc.value[j - 1].bottom
        dynamicListDesc.value[j].bottom += diff
      }
      // 更改filledEl高度
      changeFilledElHeight(diff, filledEl)
    }
  }
}

function changeFilledElHeight(diff: number, filledEl: HTMLElement) {
  const { height: filledHeight } = filledEl.getBoundingClientRect()
  filledEl.style.height = `${filledHeight + diff}px`
}

// 初始化所有列表项--动态高度
export function initAllListDesc(list: any[], itemHeight: number) {
  return list.map((item, index) => {
    return {
      height: itemHeight,
      top: index * itemHeight,
      bottom: (index + 1) * itemHeight,
      index,
      data: item,
    }
  })
}

export function calcDynamicStartEnd(
  dynamicListDesc: Ref<any[]>,
  vitrualOffset: number,
  containerHeight: number,
) {
  // 第一个展示的元素
  const start = bs(dynamicListDesc.value, vitrualOffset)
  let end = start + 1
  // 找到最后一个展示的元素
  while (
    end < dynamicListDesc.value.length // 这个判断是处理触底的找不到bottom报错
     && dynamicListDesc.value[end].bottom < (vitrualOffset + containerHeight)
  )
    end++
  return [start, end]
}
