<script setup lang='ts'>
import 'webrtc-adapter'
import DeviceInfos from './components/DeviceInfos.vue'
import Options from './components/Options.vue'
import Recorder from './components/Recorder.vue'
import Screen from './components/Screen.vue'
import NAT from './components/Nat.vue'
import PeerConect from './components/PeerConect.vue'
import { icons } from './config'
import { IconTypes } from './enum'
import { useDrag } from '~/composables/useDrag'

const localVideo = ref<HTMLVideoElement | null>(null)
const { mousedownHanlder } = useDrag(localVideo)

function ifSupportWebRTC() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
}

async function init() {
  const stream = await getMediaStream()
  window.localStream = stream // 将stream挂载到window上，方便调试
  localVideo.value!.srcObject = stream
}

function getMediaStream() {
  const constraints = {
    video: {
      aspectRatio: 0.8,
    },
    audio: false,
  }
  return navigator.mediaDevices.getUserMedia(constraints)
}

const drawerVisible = ref(false)
const types = ref<IconTypes>(IconTypes.NONE)
function showDrawer(type: IconTypes) {
  drawerVisible.value = true
  types.value = type
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
        b-r="1px solid gray-200"
      >
        <Ntag
          v-for="(icon, index) of icons" :key="index"
          :text="icon.title"
          flex justify-center cursor-pointer
          my-4
        >
          <div
            :class="icon.icon"
            w-6 h-6 text-dark-1 hover="text-teal-600" transition duration-500
            @click="showDrawer(icon.type)"
          />
        </Ntag>
      </div>
      <div flex-1 h-full>
        <video
          ref="localVideo" autoplay playsinline
          absolute h-5 w-5
          @mousedown="mousedownHanlder"
        />
      </div>
    </div>
    <NDrawer :visible="drawerVisible" @update:visible="drawerVisible = $event">
      <DeviceInfos v-if="types === IconTypes.DEVICE" />
      <Options v-if="types === IconTypes.OPTIONS" />
      <Recorder v-if="types === IconTypes.RECORDER" />
      <Screen v-if="types === IconTypes.SCREEN" />
      <NAT v-if="types === IconTypes.NAT" />
      <PeerConect v-if="types === IconTypes.PEERCONECT" />
    </NDrawer>
  </div>
</template>

<style lang="scss">
video {
  transform: scaleX(-1);
  will-change: auto;
}
</style>
