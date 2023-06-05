// 找到第一个大于等于 vitrualOffset 的值的元素
export function bs(list: any[], vitrualOffset: number) {
  const len = list.length
  let left = -1
  let right = len
  while (left < right - 1) {
    const mid = (left + right) >> 1
    const offset = list[mid].bottom
    if (offset > vitrualOffset)
      right = mid
    else if (offset < vitrualOffset)
      left = mid
    else
      return mid
  }
  return left + 1
}

export function generateRandomText(length: number) {
  let text = ''
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * possibleChars.length)
    text += possibleChars.charAt(randomIndex)
  }

  return text
}
