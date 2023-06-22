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
  '.container',
  {
    itemHeight: 150,
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
      class="container"
      w="350px" h="600px" max-h="600px"
      b="1px solid gray"
      overflow-auto
    >
      <div
        v-for="(item) of renderList" :key="item.text"
        :style="itemStyle"
        bg="white"
        h="150px"
      >
        <div h="32px" flex-center b="1px dashed gray">
          Title
        </div>
        <div
          h="[calc(100%-32px)]"
          flex flex-col
          b="1px dashed gray"
        >
          <div flex-center flex-1>
            <p text-sm>
              我是一段文本内容{{ item.text }}
            </p>
          </div>
          <div flex-center h="40px" bg="gray-100">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
