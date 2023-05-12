<script setup lang="ts">
import { ref } from 'vue'
import { useClipper } from '~/store/clipper'

const clipperStore = useClipper()

const fileInputTarget = ref<HTMLInputElement | null>(null)
const canvasTarget = ref<HTMLCanvasElement | null>(null)
const video = ref<HTMLVideoElement | null>(null)
const ctx = computed(() => canvasTarget.value!.getContext('2d')!)

const FRAME_RATE = 10

function handleFileSelect(evt: any) {
  const file = evt.target.files[0]

  const reader = new FileReader()
  reader.onload = function () {
    const videoUrl = URL.createObjectURL(file)
    clipperStore.setVideoSrc(videoUrl)
    setTimeout(() => processVideo(), 1000)
  }
  reader.readAsArrayBuffer(file)
}

function processVideo() {
  // 拿到player组件的video元素
  video.value = document.querySelector('#player')!
  // 拿到canvas元素
  const canvas = canvasTarget.value!
  canvas.width = video.value.videoWidth
  canvas.height = video.value.videoHeight
  // 调用绘制函数
  startDrawFrame()
}

function drawFrame() {
  ctx.value.drawImage(video.value!, 0, 0, video.value!.videoWidth, video.value!.videoHeight)
  const src = canvasTarget.value!.toDataURL('image/png')
  clipperStore.addFrame(src)
}

let frameCount = FRAME_RATE
let requestId: any = null
function startDrawFrame() {
  requestId = requestAnimationFrame(() => {
    frameCount--
    if (frameCount === 0) {
      frameCount = FRAME_RATE
      drawFrame()
    }
    startDrawFrame()
  })
}

onUnmounted(() => {
  cancelAnimationFrame(requestId)
})
</script>

<template>
  <div wh-full p-4>
    <input
      id="file-input"
      ref="fileInputTarget" type="file" accept=".mp4"
      top--100 absolute
      @change="handleFileSelect"
    >
    <label for="file-input">
      <div
        h-40 w-40 flex-center
        b="1px dashed gray" rounded="md"
        cursor-pointer
      >
        <div i-material-symbols:add-rounded h-30 w-30 color-gray />
      </div>
    </label>
    <canvas ref="canvasTarget" display-none />
  </div>
</template>
