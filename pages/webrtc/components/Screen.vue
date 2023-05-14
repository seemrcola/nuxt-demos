<script setup lang='ts'>
const replayVideo = ref<HTMLVideoElement | null>(null)

const constraints = {
  video: true,
  audio: false,
}

async function catchScreen() {
  // 捕获屏幕，进行录制
  if (!navigator.mediaDevices.getDisplayMedia)
    return alert('浏览器不支持屏幕捕获')
  // 获取屏幕流 使用的是getDisplayMedia
  const stream = await navigator.mediaDevices.getDisplayMedia(constraints)
  // 赋值给video标签
  replayVideo.value!.srcObject = stream
}
</script>

<template>
  <div wh-full text-sm>
    <div p-2 b="1px dashed gray">
      <div btn mr-4 @click="catchScreen">
        Catch Screen
      </div>
    </div>

    <div h="300px" p-2 b="1px dashed gray">
      <video ref="replayVideo" w-full />
    </div>
  </div>
</template>
