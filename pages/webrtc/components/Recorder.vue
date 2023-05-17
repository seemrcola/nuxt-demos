<script setup lang='ts'>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

let recorder: MediaRecorder
const buffer = ref<Blob[]>([])
const replayVideo = ref<HTMLVideoElement | null>(null)
const isRecording = ref(false)
const isReplay = ref(false)

function startRecord() {
  // 获取本地视频流，我们预先将流挂载到window上，方便调试
  const stream = window.localStream
  if (!stream)
    return alert('请先打开摄像头')

  // 视频格式 codecs=vp9表示使用vp9编码
  const options = { mimeType: 'video/webm;codecs=vp9' }
  // 检查浏览器是否支持该格式
  const isTypeSupported = MediaRecorder.isTypeSupported(options.mimeType)
  if (!isTypeSupported)
    return alert('浏览器不支持该格式')
  // 开启录制相机
  recorder = new MediaRecorder(stream, options)
  // 收集录制数据
  celectRecord()
  // 开始录制
  recorder.start()
  isRecording.value = true
}

function celectRecord() {
  recorder.ondataavailable = (e) => {
    // 将录制的数据存储到buffer中
    if (e.data && e.data.size > 0)
      buffer.value.push(e.data)
  }
}

function stopRecord() {
  // 停止录制
  recorder.stop()
  isRecording.value = false
  isReplay.value = true
}

function replay() {
  // 将录制的数据转换为blob格式
  const blob = new Blob(buffer.value, { type: 'video/webm' })
  // 将blob转换为url
  const url = window.URL.createObjectURL(blob)
  // 将url赋值给video标签
  replayVideo.value!.src = url
  replayVideo.value!.play()
  // 清空buffer
  buffer.value = []
}

const code = `
function startRecord() {
  // 获取本地视频流，我们预先将流挂载到window上，方便调试
  const stream = window.localStream
  if (!stream)
    return alert('请先打开摄像头')
  // 视频格式 codecs=vp9表示使用vp9编码
  const options = { mimeType: 'video/webm;codecs=vp9' }
  // 检查浏览器是否支持该格式
  const isTypeSupported = MediaRecorder.isTypeSupported(options.mimeType)
  if (!isTypeSupported)
    return alert('浏览器不支持该格式')
  // 开启录制相机
  recorder = new MediaRecorder(stream, options)
  // 收集录制数据
  recorder.ondataavailable = (e) => {
    // 将录制的数据存储到buffer中
    if (e.data && e.data.size > 0)
      buffer.value.push(e.data)
  }
  // 开始录制
  recorder.start()
}

function stopRecord() {
  // 停止录制
  recorder.stop()
}

function replay() {
  // 将录制的数据转换为blob格式
  const blob = new Blob(buffer.value, { type: 'video/webm' })
  // 将blob转换为url
  const url = window.URL.createObjectURL(blob)
  // 将url赋值给video标签
  replayVideo.value!.src = url
  replayVideo.value!.play()
  buffer.value = []
}`
const recordCodeHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript')

onUnmounted(() => {
  recorder?.stop()
})
</script>

<template>
  <div wh-full text-sm>
    <div p-2 b="1px dashed gray">
      <div v-if="!isRecording" btn mr-4 @click="startRecord">
        Start Record
      </div>
      <div v-else btn mr-4 @click="stopRecord">
        End Record
      </div>
      <div v-if="isReplay" btn @click="replay">
        Replay
      </div>
    </div>

    <div h="300px" p-2 b="1px dashed gray" overflow-y-auto flex-center>
      <div v-if="isRecording">
        <div i-carbon:recording-filled text-red-4 text-5xl />
        <p>Recording</p>
      </div>
      <video v-else ref="replayVideo" h-full w-auto />
    </div>

    <div
      max-h="[calc(100vh-400px)]" overflow-auto
      mt-4
      b="1px dashed gray"
    >
      <NCode :code-html="recordCodeHtml" />
    </div>
  </div>
</template>
