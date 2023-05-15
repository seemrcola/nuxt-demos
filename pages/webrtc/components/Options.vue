<script setup lang='ts'>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

const videoOptionsCode = `
videoOptions: {
  height: <number>,                   // 视频高度
  width: <number>,                    // 视频宽度
  aspectRatio: <number>,              // 视频宽高比
  frameRate: <number>,                // 视频帧率
  facingMode: <string>,               // 视频摄像头方向
  bitRate: <number>,                  // 视频比特率，单位为 bps
  keyFrameInterval: <number>,         // I 帧间隔
  codec: <string>,                    // 视频编解码器
  autoGainControl: <boolean>,         // 自动增益控制
  noiseSuppression: <boolean>,        // 噪音抑制
  echoCancellation: <boolean>,        // 回声消除
  advanced: [<MediaTrackConstraint>], // 高级参数配置
}`
const audioOptionsCode = `
audioOptions: {
  sampleRate: <number>,                // 采样率
  channelCount: <number>,              // 声道数
  volume: <number>,                    // 音量
  echoCancellation: <boolean>,         // 回声消除
  autoGainControl: <boolean>,          // 自动增益控制
  noiseSuppression: <boolean>,         // 噪音抑制
  latency: <number>,                   // 延迟时间，单位为毫秒
  advanced: [<MediaTrackConstraint>],  // 高级参数配置
}`

const code = `
// 在拿到stream流之后，可以通过以下方式获取配置信息
const videoTrack = stream.getVideoTracks()[0]
const audioTrack = stream.getAudioTracks()[0]
const videoConstraints = videoTrack.getSettings()
const audioConstraints = audioTrack.getSettings()`

const videoCodeHtml = Prism.highlight(videoOptionsCode, Prism.languages.javascript, 'javascript')
const audioCodeHtml = Prism.highlight(audioOptionsCode, Prism.languages.javascript, 'javascript')
const codeHtml = Prism.highlight(code, Prism.languages.javascript, 'javascript')
</script>

<template>
  <div p-4 overflow-y-auto>
    <pre leading-5>
      <code v-html="videoCodeHtml" />
    </pre>
    <pre leading-5>
      <code v-html="audioCodeHtml" />
    </pre>

    <div b="1px dashed gray" mt-6 px-2 leading-5>
      <NCode :code-html="codeHtml" />
    </div>
  </div>
</template>

<style scoped>
pre {
  padding: 0;
  margin: 0;
}
</style>
