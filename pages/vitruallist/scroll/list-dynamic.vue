<script setup lang='ts'>
import { useVitrualList } from './useVitrualList'

function generateRandomText() {
  let text = ''
  const length = Math.floor(Math.random() * 200) + 1 // 随机生成长度为1到10的整数
  const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * possibleChars.length)
    text += possibleChars.charAt(randomIndex)
  }

  return text
}

// ================ 10000 items ===============
const length = 10000
const list: any[] = []
for (let i = 0; i < length; i++)
  list.push({ text: i, content: generateRandomText() })
// ===========================================

// ============= useVitrualList ===============
const vitrualList = useVitrualList(
  list,
  '.container-list-dynamic',
  {
    itemHeight: 80,
    containerHeight: 600,
    dynamic: true,
  },
)
const { init, dynamicList, itemStyle } = vitrualList
init()
// =========================================
</script>

<template>
  <div>
    <div
      class="container-list-dynamic"
      w="350px" h="600px" max-h="600px"
      b="1px solid gray"
    >
      <div
        v-for="(item) of dynamicList" :key="item.data.index"
        bg="white"
        :data-index="item.index"
        :style="itemStyle"
      >
        <div h-full flex-center b="1px dashed gray">
          #Title {{ item.data.text }}
        </div>
        <div
          b="1px dashed gray" p-4
          :style="{ 'overflow-wrap': 'break-word' }"
        >
          {{ item.data.content }}
        </div>
      </div>
    </div>
  </div>
</template>
