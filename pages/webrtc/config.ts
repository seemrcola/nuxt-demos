import { IconTypes } from './enum'

// @unocss-include
export const icons = [
  { icon: 'i-mdi:devices', type: IconTypes.DEVICE, title: '设备类型', baseon: 'Base' },
  { icon: 'i-material-symbols:settings-video-camera-outline', type: IconTypes.OPTIONS, title: '音视频约束', baseon: 'Base' },
  { icon: 'i-fluent:video-recording-20-regular', type: IconTypes.RECORDER, title: '录制', baseon: 'Base' },
  { icon: 'i-material-symbols:monitor-outline-sharp', type: IconTypes.SCREEN, title: '屏幕捕获', baseon: 'Base' },
  { icon: 'i-mdi:router-network', type: IconTypes.NAT, title: 'NAT', baseon: 'Base' },
  { icon: 'i-mdi:account-multiple', type: IconTypes.PEERCONECT, title: '点对点', baseon: 'LocalP2P' },
]
