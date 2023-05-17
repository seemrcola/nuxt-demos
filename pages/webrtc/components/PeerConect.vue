<script setup lang='ts'>
const media = `
// 创建一个offer，offer就是sdp的一种描述格式
// sdp包含了媒体协商的信息，包括媒体类型、编解码器、带宽、分辨率等
createOffer() 
// 创建本地描述，去获取候选者信息
setLocalDescription()  [A]
// 通过信令服务器发送offer给对方
sendOffer()
// 对方收到offer后，存储offer信息
setRemoteDescription() [from A]
// 对方创建answer，包含了媒体协商的信息
createAnswer()
// 对方创建本地描述，去获取候选者信息
setLocalDescription()  [B]
// 通过信令服务器发送answer给对方
sendAnswer()
// 本地收到answer后，存储answer信息
setRemoteDescription() [from B]
// 本地和对方都收到了对方的媒体协商信息，开始进行候选者信息的交换
addIceCandidate()`
</script>

<template>
  <div wh-full text-sm overflow-auto>
    <div h-10 b="1px dashed gray" flex-center>
      <a href="https://webrtcforthecurious.com/zh/docs/" target="_blank">
        [给爱好者的WebRTC教程]
      </a>
    </div>
    <div flex-col overflow-auto>
      <img
        w-full object-fill
        src="~/assets/webrtc/rtcp2p.png"
        b-b="1px solid gray"
      >
      <div px-2 b="1px dashed gray">
        <NCode :code-html="media" />
      </div>
    </div>

    <div flex-col>
      <img
        w-full object-fill
        src="~/assets/webrtc/p2p.png"
        b-b="1px solid gray"
      >
    </div>
  </div>
</template>
