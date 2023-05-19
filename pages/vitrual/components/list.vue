<script setup lang='ts'>
import { useVitrualList } from './useVitrualList'

const length = 5000
const list: any[] = []
for (let i = 0; i < length; i++)
  list.push({ text: i })

const vitrualList = useVitrualList(
  list,
  '.container',
  {
    itemHeight: 40,
    containerHeight: 400,
  })
const { init, renderList, renderOffsetStyle } = vitrualList
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
        :style="renderOffsetStyle"
        bg="gray-200" p-4 b="1px solid #eee"
        h="40px"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
