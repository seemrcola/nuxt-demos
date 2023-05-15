<script setup lang='ts'>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

const replayVideo = ref<HTMLVideoElement | null>(null)
const screenShareStream = ref<MediaStream>()

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

  screenShareStream.value = stream

  // 赋值给video标签
  replayVideo.value!.srcObject = stream
  replayVideo.value!.play()
}

async function stop() {
  // 停止屏幕共享
  if (screenShareStream.value) {
    const [screenTrack] = screenShareStream.value.getTracks()
    screenTrack.stop()
    screenShareStream.value = undefined
  }
}
const code = `
// code base on vue3
const replayVideo = ref<HTMLVideoElement | null>(null)
const screenShareStream = ref<MediaStream>()

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
  screenShareStream.value = stream
  // 赋值给video标签
  replayVideo.value!.srcObject = stream
  replayVideo.value!.play()
}

async function stop() {
  // 停止屏幕共享
  if (screenShareStream.value) {
    const [screenTrack] = screenShareStream.value.getTracks()
    screenTrack.stop()
    screenShareStream.value = undefined
  }
}`
const codeHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript')
</script>

<template>
  <div wh-full text-sm>
    <div p-2 b="1px dashed gray">
      <div btn mr-4 @click="catchScreen">
        Catch Screen
      </div>
      <div btn mr-4 @click="stop">
        Stop Catch Screen
      </div>
    </div>

    <div p-2 b="1px dashed gray">
      <video ref="replayVideo" w-full />
    </div>

    <div
      b="1px dashed gray"
      max-h="[calc(100vh-400px)]"
      overflow-auto mt-4
    >
      <NCode :code-html="codeHtml" />
    </div>
  </div>
</template>
