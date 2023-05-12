<script setup lang='ts'>
import 'webrtc-adapter'
import DeviceInfos from './components/DeviceInfos.vue'
import { DeviceTypes } from '~/enums/webrtc.enum'

const localVideo = ref<HTMLVideoElement | null>(null)
const deviceInfos = ref<any[]>([])

function ifSupportWebRTC() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
}

async function init() {
  const stream = await getMediaStream()
  localVideo.value!.srcObject = stream
  deviceInfos.value = await getDevices()
}

function getMediaStream() {
  const constraints = {
    video: true,
    audio: false,
  }
  return navigator.mediaDevices.getUserMedia(constraints)
}

async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const result: any[] = []
  devices.forEach((device) => {
    let desc = ''
    if (device.kind === DeviceTypes.AUDIO_INPUT)
      desc = 'Audio-input'
    if (device.kind === DeviceTypes.AUDIO_OUTPUT)
      desc = 'Audio-output'
    if (device.kind === DeviceTypes.VIDEO_INPUT)
      desc = 'Video-input'
    result.push({ deviceLabel: device.label, deviceId: device.deviceId, desc })
  })
  return result
}

const drawerVisible = ref(false)
function showDrawer() {
  drawerVisible.value = true
}

onMounted(() => {
  if (!ifSupportWebRTC())
    return alert('浏览器不支持WebRTC')
  init()
})
</script>

<template>
  <div w="100vw" h="100vh" overflow-hidden>
    <div h="40px" w-full flex-center b-b="solid 1px gray-300">
      <strong>WebRTC Study</strong>
    </div>
    <div flex h="[calc(100vh-40px)]">
      <div
        w="40px" h-full
        py-2
        b-r="1px solid gray-200"
      >
        <Ntag text="设备信息" flex justify-center cursor-pointer>
          <div i-mdi:devices w-6 h-6 @click="showDrawer" />
        </Ntag>
      </div>
      <div flex-1 h-full>
        <video
          ref="localVideo" autoplay playsinline
        />
      </div>
    </div>
    <NDrawer :visible="drawerVisible" @update:visible="drawerVisible = $event">
      <DeviceInfos :device-infos="deviceInfos" />
    </NDrawer>
  </div>
</template>
