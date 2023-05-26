<script setup lang='ts'>
import { useRouter } from 'vue-router'

const demos = [
  { title: 'Editor', desc: '一个拖拽缩放的基本实现', icon: 'i-ri:coreos-fill' },
  { title: 'Clipper', desc: '一个视频裁剪工具', icon: 'i-ic:baseline-video-settings' },
  { title: 'WebRTC', desc: 'webrtc的一些例子', icon: 'i-mdi:webrtc' },
  { title: 'VitrualList', desc: '虚拟滚动的案例', icon: 'i-material-symbols:format-list-bulleted-add-rounded' },
  { title: 'CodeMirror', desc: '自由发挥的编辑器', icon: 'i-simple-icons:codemirror' },
]

const $router = useRouter()
function goto(route: string) {
  if (route === 'Editor')
    gotoEdit()
  if (route === 'Clipper')
    gotoClipping()
  if (route === 'WebRTC')
    gotoRTC()
  if (route === 'VitrualList')
    gotoVitrual()
  if (route === 'CodeMirror')
    gotoCodeMirror()
}

function gotoEdit() {
  $router.push('/editor')
}
function gotoClipping() {
  $router.push('/clipping')
}
function gotoRTC() {
  $router.push('/webrtc')
}
function gotoVitrual() {
  $router.push('./vitrual')
}
function gotoCodeMirror() {
  $router.push('./codemirror')
}
</script>

<template>
  <div
    h="100vh" w="100vw" py-10
    flex flex-wrap justify-around
  >
    <div
      v-for="demo in demos"
      :key="demo.title"
      class="card"
      flex-center
      w="300px"
      rounded-3 text-sm
      @click="goto(demo.title)"
    >
      <div
        text-orange
        h-8 w-8 mx-4
        :class="demo.icon"
      />
      <div>
        <h3>{{ demo.title }}</h3>
        <div text-gray-500>
          {{ demo.desc }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  padding: 0.6rem 1rem;
  transition: all .3s;
  &:hover {
    transform: scale(1.05);
    background-color: beige;
  }
}
</style>
