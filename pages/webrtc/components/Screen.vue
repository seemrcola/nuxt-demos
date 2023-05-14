<script setup lang='ts'>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

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
  replayVideo.value!.play()
}

const code = `
// code base on vue3
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
  replayVideo.value!.play()
}`
const codeHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript')
</script>

<template>
  <div wh-full text-sm>
    <div p-2 b="1px dashed gray">
      <div btn mr-4 @click="catchScreen">
        Catch Screen
      </div>
    </div>

    <div p-2 b="1px dashed gray">
      <video ref="replayVideo" w-full />
    </div>

    <pre
      mt-4 px-2 max-h="450px" overflow-auto
      b="1px dashed gray"
    >
      <code v-html="codeHtml" />
    </pre>
  </div>
</template>
