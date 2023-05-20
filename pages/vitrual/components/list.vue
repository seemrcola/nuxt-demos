<script setup lang='ts'>
import { useVitrualList } from './useVitrualList'

// ==== 5000 items ===============
const length = 5000
const list: any[] = []
for (let i = 0; i < length; i++)
  list.push({ text: i })
// ==============================

// =======icons===================
const icons = [
  'i-tabler:brand-vscode',
  'i-tabler:brand-github',
  'i-tabler:brand-chrome',
  'i-tabler:brand-firefox',
  'i-tabler:brand-edge',
  'i-tabler:brand-opera',
  'i-tabler:brand-safari',
  'i-tabler:brand-figma',
  'i-tabler:brand-framer',
  'i-tabler:brand-sketch',
]
// ==============================

// ====== useVitrualList =========
const vitrualList = useVitrualList(
  list,
  '.container',
  {
    itemHeight: 80,
    containerHeight: 600,
  },
)
const { init, renderList, renderOffsetStyle } = vitrualList
init()
// ==============================
</script>

<template>
  <div>
    <div
      class="container"
      w="300px" h="600px" max-h="600px"
      b="1px solid gray"
      overflow-auto
    >
      <div
        v-for="(item, index) of renderList" :key="index"
        :style="renderOffsetStyle"
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
            <div h-12 w-12 :class="icons[index % 10]" />
          </div>
          <div flex-center h-10 bg="gray-100">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
