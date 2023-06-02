<script setup lang='ts'>
const iframe = ref(false)
const iframeSrc = ref('')

const list = [
  { url: 'https://icones.js.org/', icon: 'i-tabler:icons', desc: 'icones' },
  { url: 'https://unocss.dev/play', icon: 'i-logos:unocss', desc: 'unocss' },
]

function openIframe(link: string, blank?: '_blank') {
  if (blank)
    window.open(link, '_blank')
  iframe.value = true
  iframeSrc.value = link
}
</script>

<template>
  <div wh-full>
    <div flex-center b-b="1px dashed gray" h="36px" font-700>
      The website involved
    </div>
    <div
      v-for="item of list" :key="item.url" flex px-1 h-10
      items-center b-b="1px dashed gray"
    >
      <div
        :class="item.icon"
        h-6 w-6 mr-1 cursor-pointer
        hover:text-orange-400 transition duration-300
        title="iframe open"
        @click="openIframe(item.url)"
      />
      <div
        px-4 bg="gray-200" color-white flex-1
        hover:bg-orange-400 transition duration-300
        :title="item.url"
        @click="openIframe(item.url, '_blank')"
      >
        {{ item.desc }}
      </div>
    </div>

    <NIframeModal
      :visible="iframe"
      :src="iframeSrc"
      @update:visible="iframe = $event"
    />
  </div>
</template>
