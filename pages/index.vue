<script setup lang='ts'>
const haveNotBegun = [
  { title: 'Clipper', desc: 'video clipping tool', icon: 'i-ic:baseline-video-settings' },
  { title: 'Multi', desc: 'multi-person collaboration', icon: 'i-mdi-light:monitor-multiple' },
  { title: 'Uploader', desc: 'uploader for myself', icon: 'i-material-symbols:drive-folder-upload' },
]

const finish = [
  { title: 'nothing', desc: 'nothing', icon: 'i-game-icons:nothing-to-say' },
]

const building = [
  { title: 'Editor', desc: 'simple drag demo', icon: 'i-ri:coreos-fill' },
  { title: 'WebRTC', desc: 'webrtc demos', icon: 'i-mdi:webrtc' },
  { title: 'VirtualList', desc: 'virtual-list two plans ', icon: 'i-material-symbols:format-list-bulleted-add-rounded' },
  { title: 'Anchor', desc: 'watch pointer position and anchor', icon: 'i-ph:anchor-bold' },
]

const router = useRouter()

function goto(route: string) {
  router.push({ name: route.toLocaleLowerCase() })
}
</script>

<template>
  <div
    h="100vh" w="100vw" max-h="100vh" overflow-auto
    py-10
    flex flex-wrap justify-around
  >
    <div w-full px-10 hover:bg-gray-200 transition duration-400>
      <p font-700 text-center>
        Have Not Begun
      </p>
      <NProject :list="haveNotBegun" @goto="goto" />
    </div>
    <div w-full px-10 hover:bg-orange-200 transition duration-400>
      <p font-700 text-center>
        Building
      </p>
      <NProject :list="building" @goto="goto" />
    </div>
    <div w-full px-10 hover:bg-red-200 transition duration-400>
      <p font-700 text-center>
        Finish
      </p>
      <NProject :list="finish" @goto="goto" />
    </div>
  </div>
</template>
