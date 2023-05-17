<script setup lang='ts'>
// 无信令服务器的P2P通信

import { useDrag } from '~/composables/useDrag'

const localVideo = ref<HTMLVideoElement | null>(null)
const remoteVideo = ref<HTMLVideoElement | null>(null)

const { mousedownHanlder } = useDrag(remoteVideo)

const localStream = ref<MediaStream | null>(null)

let pc1: RTCPeerConnection
let pc2: RTCPeerConnection

const offerJSON: any = ref({ sdp: '', type: '' })
const answerJSON: any = ref({ sdp: '', type: '' })

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

function getRemoteStream(streams: readonly MediaStream[]) {
  remoteVideo.value!.srcObject = streams[0]
}

async function getLocalDescription(desc: RTCSessionDescriptionInit) {
  // 将本地描述信息设置到pc1中
  pc1.setLocalDescription(desc)
  // 通过信令服务器发送给对端
  // !! no code 本地操作，没有信令服务器，所以直接将本地的描述信息设置到pc2中
  // 将本地描述信息设置到pc2中
  pc2.setRemoteDescription(desc)
  // 生成对端的描述信息
  const answer = await pc2.createAnswer()
  answerJSON.value = answer
  // 通过信令服务器发送给对端
  getAnswer(answer)
}

async function getAnswer(desc: RTCSessionDescriptionInit) {
  // 将对端的描述信息设置到pc2中
  pc2.setLocalDescription(desc)
  // 将对端的描述信息设置到pc1中
  pc1.setRemoteDescription(desc)
}

async function call() {
  // 先将RTC连接对象创建好
  pc1 = new RTCPeerConnection()
  pc2 = new RTCPeerConnection()
  // 添加对端的candidate 即候选者的信息
  pc1.onicecandidate = (e) => {
    if (e.candidate)
      pc2.addIceCandidate(e.candidate)
  }
  pc2.onicecandidate = (e) => {
    if (e.candidate)
      pc1.addIceCandidate(e.candidate)
  }
  pc2.ontrack = (e) => {
    getRemoteStream(e.streams)
  }
  // 将本地流添加到pc1对象中
  localStream.value!.getTracks().forEach((track) => {
    pc1.addTrack(track, localStream.value!)
  })
  // 开始媒体协商=======================================
  const offerOptions = {
    offerToReceiveAudio: false,
    offerToReceiveVideo: true,
  }
  // 创建offer
  const offer = await pc1.createOffer(offerOptions)
  offerJSON.value = offer
  // 生成本地的描述信息
  getLocalDescription(offer)
  // ================================================
  // 在这里协商完毕，开始连接检测之类的
}

onMounted(() => {
  init()
})
</script>

<template>
  <div flex wh-full relative>
    <div
      p-4 w="150px" h-full
      flex-center b-r="1px dashed gray"
    >
      <div btn @click="call">
        call
      </div>
    </div>
    <div flex-1 p-4 flex>
      <video
        ref="localVideo" autoplay playsinline
        h-full w-auto
      />
      <div flex-1>
        <div m-4 p-1 b="1px dashed gray">
          offer
        </div>
        <textarea block mx-4 h="300px" w="[calc(100%-2rem)]" readonly :value="offerJSON.sdp" />
        <div m-4 p-1 b="1px dashed gray">
          answer
        </div>
        <textarea block mx-4 h="300px" w="[calc(100%-2rem)]" readonly :value="answerJSON.sdp" />
      </div>
      <Teleport to="body">
        <video
          ref="remoteVideo" autoplay playsinline
          absolute right="100px" top="100px"
          h="300px" w="300px"
          bg="white" b="1px solid gray" shadow="md"
          @mousedown="mousedownHanlder"
        />
      </Teleport>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
}
</style>
