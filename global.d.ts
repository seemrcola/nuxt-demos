import { MessageTipFunction } from '@/components/MessageTip'

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
  localStream: MediaStream // 本地视频流 
}
