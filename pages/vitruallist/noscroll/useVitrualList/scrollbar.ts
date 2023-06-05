import { SCROLL_NAME, SCROLL_WRAPPER_NAME } from './constants'

export function scrollbar(barHeight: number) {
  const scrollbar = document.createElement('div')
  scrollbar.className = SCROLL_NAME

  const position = 'absolute'
  const right = '2px'
  const top = '0'
  const height = `${barHeight}px`
  const width = '8px'
  const backgroundColor = '#c1c1c1'
  const zIndex = '999'
  const cursor = 'pointer'
  const borderRadius = '5px'

  scrollbar.style.cssText = `
    position: ${position};
    right: ${right};
    top: ${top};
    width: ${width};
    height: ${height};
    background-color: ${backgroundColor};
    z-index: ${zIndex};
    cursor: ${cursor};
    border-radius: ${borderRadius};
  `
  return scrollbar
}

export function scrollWrapper(containerHeight: number) {
  const wrapper = document.createElement('div')
  wrapper.className = SCROLL_WRAPPER_NAME

  const height = `${containerHeight}px`
  const width = '14px'
  const position = 'absolute'
  const right = '0'
  const top = '0'
  const backgroundColor = '#fafafa'
  const zIndex = '999'

  wrapper.style.cssText = `
    height: ${height};
    width: ${width};
    position: ${position};
    right: ${right};
    top: ${top};
    background-color: ${backgroundColor};
    z-index: ${zIndex};
  `

  return wrapper
}
