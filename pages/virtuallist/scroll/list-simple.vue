<script setup lang='ts'>
import { useVirtualList } from './useVirtualList'

// ==== 10000 items ===============
const length = 10000
const list: any[] = []
for (let i = 0; i < length; i++)
  list.push({ text: i })
// ==============================

// ====== useVirtualList ==============
const virtualList = useVirtualList(
  list,
  '.container-simple',
  {
    itemHeight: 40,
    containerHeight: 600,
  },
)
const { init, renderList, itemStyle } = virtualList
init()
// ====================================
</script>

<template>
  <div>
    <div
      class="container-simple"
      w="350px" h="600px"
      b="1px solid gray"
      overflow-auto
    >
      <div
        v-for="(item) of renderList" :key="item.text"
        bg="white"
        h="40px"
        :style="itemStyle"
      >
        <div h-full flex-center b="1px dashed gray">
          #Title {{ item.text }}
        </div>
      </div>
    </div>
  </div>
</template>
