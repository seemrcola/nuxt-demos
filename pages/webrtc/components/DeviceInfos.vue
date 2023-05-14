<script setup lang='ts'>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

import { DeviceTypes } from '~/enums/webrtc.enum'

const deviceInfos = ref<any[]>([])

async function getDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const result: any[] = []
  devices.forEach((device) => {
    let desc = ''
    if (device.kind === DeviceTypes.AUDIO_INPUT)
      desc = 'Audio-input'
    if (device.kind === DeviceTypes.AUDIO_OUTPUT)
      desc = 'Audio-output'
    if (device.kind === DeviceTypes.VIDEO_INPUT)
      desc = 'Video-input'
    result.push({ deviceLabel: device.label, deviceId: device.deviceId, desc })
  })
  return result
}

onMounted(async () => {
  deviceInfos.value = await getDevices()
})

const code = `                             
 const devices =                          
      await navigator.mediaDevices.enumerateDevices()`
const html = Prism.highlight(code, Prism.languages.javascript, 'javascript')
</script>

<template>
  <div w-full p-4 text-sm>
    <div v-for="(device, index) of deviceInfos" :key="index" my-2>
      <div b="1px dashed gray" p-1 mb-1>
        {{ device.desc }}
      </div>
      <div bg-teal-600 text="white" p-1>
        {{ device.deviceLabel }}
      </div>
    </div>

    <div mt-8 b="1px dashed gray">
      <pre leading-6>
        <code v-html="html" />
      </pre>
    </div>
  </div>
</template>
