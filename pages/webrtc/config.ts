import { IconTypes } from './enum'

// @unocss-include
export const icons = [
  { icon: 'i-mdi:devices', type: IconTypes.DEVICE, title: '设备类型' },
  { icon: 'i-material-symbols:settings-video-camera-outline', type: IconTypes.OPTIONS, title: '音视频约束' },
  { icon: 'i-fluent:video-recording-20-regular', type: IconTypes.RECORDER, title: '录制' },
  { icon: 'i-material-symbols:monitor-outline-sharp', type: IconTypes.SCREEN, title: '屏幕捕获' },
  { icon: 'i-mdi:router-network', type: IconTypes.NAT, title: 'NAT' },
  { icon: 'i-mdi:account-multiple', type: IconTypes.PEERCONECT, title: '点对点' },
]
