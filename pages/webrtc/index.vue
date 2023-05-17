<script setup lang='ts'>
import 'webrtc-adapter'
import DeviceInfos from './components/DeviceInfos.vue'
import Options from './components/Options.vue'
import Recorder from './components/Recorder.vue'
import Screen from './components/Screen.vue'
import NAT from './components/Nat.vue'
import PeerConect from './components/PeerConect.vue'

import Base from './base.vue'
import LocalP2P from './localP2P.vue'

import { icons } from './config'
import { IconTypes } from './enum'

const drawerVisible = ref(false)
const types = ref<IconTypes>(IconTypes.NONE)
const baseon = ref('Base')
function showDrawer(type: IconTypes, baseOn: string) {
  drawerVisible.value = true
  types.value = type
  baseon.value = baseOn
}

function ifSupportWebRTC() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
}

onMounted(() => {
  if (!ifSupportWebRTC())
    return alert('浏览器不支持WebRTC')
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
            @click="showDrawer(icon.type, icon.baseon)"
          />
        </Ntag>
      </div>
      <div flex-1 h-full>
        <Base v-if="baseon === 'Base'" />
        <LocalP2P v-if="baseon === 'LocalP2P'" />
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
