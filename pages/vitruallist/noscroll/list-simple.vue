<script setup lang='ts'>
import { useVitrualList } from './useVitrualList'

// ==== 10000 items ===============
const length = 10000
const list: any[] = []
for (let i = 0; i < length; i++)
  list.push({ text: i })
// ==============================

// ====== useVitrualList ==============
const vitrualList = useVitrualList(
  list,
  '.container-simple',
  {
    itemHeight: 40,
    containerHeight: 600,
    scrollbar: true,
  },
)
const { init, renderList, renderOffsetStyle } = vitrualList
init()
// ====================================
</script>

<template>
  <div>
    <div
      class="container-simple"
      w="350px" h="600px" max-h="600px"
      b="1px solid gray"
      overflow-auto
    >
      <div
        v-for="(item) of renderList" :key="item.text"
        :style="renderOffsetStyle"
        bg="white"
        h="40px"
      >
        <div h-full flex items-center pl-4 b="1px dashed gray">
          #Title {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>
