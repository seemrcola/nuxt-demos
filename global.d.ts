interface FnKeyboard {
  ctrl: boolean
  shift: boolean
  meta: boolean
  space: boolean
}

declare interface Window {
  $KeyboardActive: FnKeyboard
  $OS: 'WINDOWS'|'MAC'
  $ifwebkit: boolean
}
