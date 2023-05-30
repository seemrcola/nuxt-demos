// 找到第一个大于等于 vitrualOffset 的值的下标
// export function bs(len: number, vitrualOffset = 0, itemHeight: number) {
//   let left = -1
//   let right = len + 1
//   while (left < right - 1) {
//     const mid = (left + right) >> 1
//     const offset = mid * itemHeight
//     if (offset > vitrualOffset)
//       right = mid
//     else if (offset < vitrualOffset)
//       left = mid
//     else
//       return mid + 1
//   }
//   return left + 1
// }

// throttle函数实现
export function throttle(this: any, fn: Function, delay: number) {
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
