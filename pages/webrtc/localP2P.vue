<script setup lang='ts'>
const localVideo = ref<HTMLVideoElement | null>(null)
const remoteVideo = ref<HTMLVideoElement | null>(null)

const localStream = ref<MediaStream | null>(null)

async function init() {
  const stream = await getMediaStream()
  localStream.value = stream
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

function call() {
  // 先将RTC连接对象创建好
  const pc1 = new RTCPeerConnection()
  const pc2 = new RTCPeerConnection()

  pc1.onicecandidate = (e) => {
    if (e.candidate)
      pc2.addIceCandidate(e.candidate)
  }
}

onMounted(() => {
  init()
})
</script>

<template>
  <div>
    <video ref="localVideo" />
    <video ref="remoteVideo" />
  </div>
</template>
