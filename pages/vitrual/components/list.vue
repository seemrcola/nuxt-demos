<script setup lang='ts'>
import { useVitrualList } from './useVitrualList'

const length = 100000
const list: any[] = []
for (let i = 0; i < length; i++)
  list.push({ text: i })

const { init, renderList } = useVitrualList(
  list,
  '.container',
  {
    itemHeight: 40,
    containerHeight: 400,
    // buffer: 50,
  })
init()
</script>

<template>
  <div>
    <div
      class="container"
      w="80vw" h="400px" max-h="400px" overflow-auto
    >
      <div
        v-for="(item, index) of renderList" :key="index"
        bg="gray-200" p-4 b="1px solid #eee"
        h="40px"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
