import { bs } from './utils'

export function updateDesc(
  dynamic: boolean,
  containerEl: HTMLElement,
  dynamicListDesc: Ref<any[]>,
  filledElName: string,
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
    if (child.className === filledElName)
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
      changeFilledElHeight(diff, filledElName)
    }
  }
}

function changeFilledElHeight(diff: number, filledElName: string) {
  const filledEL = document.querySelector(`.${filledElName}`) as HTMLElement
  const { height: filledHeight } = filledEL.getBoundingClientRect()
  filledEL.style.height = `${filledHeight + diff}px`
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

export function calcStartEnd(
  dynamicListDesc: Ref<any[]>,
  vitrualOffset: number,
  containerHeight: number,
) {
  const start = bs(dynamicListDesc.value, vitrualOffset)
  let end = start + 1
  while (
    end < dynamicListDesc.value.length
     && dynamicListDesc.value[end].bottom < (vitrualOffset + containerHeight)
  )
    end++
  return [start, end]
}
