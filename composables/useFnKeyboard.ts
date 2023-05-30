export function useKeyboard() {
  // 默认赋值
  window.$KeyboardActive = {
    ctrl: false,
    space: false,
    shift: false,
    meta: false, // mac command
  }

  document.onkeydown = (e: KeyboardEvent) => {
    const { key } = e
    switch (key) {
      case 'Control':
        window.$KeyboardActive.ctrl = true
        break
      case 'Shift':
        window.$KeyboardActive.shift = true
        break
      case 'Meta':
        window.$KeyboardActive.meta = true
        break
      case ' ':
        e.preventDefault()
        window.$KeyboardActive.space = true
        break
    }
  }

  document.onkeyup = (e: KeyboardEvent) => {
    const { key } = e
    switch (key) {
      case 'Control':
        window.$KeyboardActive.ctrl = false
        break
      case 'Shift':
        window.$KeyboardActive.shift = false
        break
      case 'Meta':
        window.$KeyboardActive.meta = false
        break
      case ' ':
        window.$KeyboardActive.space = false
        break
    }
  }
}
