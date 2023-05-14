<script setup lang='ts'>
import type { IconTypes } from '../enum'
import DeviceInfos from './DeviceInfos.vue'

const props = defineProps<{
  type: IconTypes
  deviceInfos: any[]
}>()
</script>

<template>
  <div>
    <DeviceInfos v-if="props.type === 'device'" :device-infos="props.deviceInfos" />
  </div>
</template>
