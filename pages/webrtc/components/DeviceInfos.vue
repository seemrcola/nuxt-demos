<script setup lang='ts'>
const props = defineProps<{
  deviceInfos: any[]
}>()
</script>

<template>
  <div w-full p-4 text-sm>
    <div v-for="(device, index) of props.deviceInfos" :key="index" my-2>
      <div b="1px dashed gray" p-1 mb-1>
        {{ device.desc }}
      </div>
      <div bg-teal-600 text="white" p-1>
        {{ device.deviceLabel }}
      </div>
    </div>
  </div>
</template>
