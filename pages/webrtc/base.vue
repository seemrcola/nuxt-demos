<script setup lang='ts'>
import { useDrag } from '~/composables/useDrag'

const localVideo = ref<HTMLVideoElement | null>(null)
const { mousedownHanlder } = useDrag(localVideo)

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

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <video
      ref="localVideo" autoplay playsinline
      absolute h-5 w-5
      @mousedown="mousedownHanlder"
    />
  </div>
</template>
