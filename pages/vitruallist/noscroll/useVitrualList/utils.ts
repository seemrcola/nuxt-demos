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
