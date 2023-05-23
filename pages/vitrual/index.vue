<script setup lang='ts'>
import List from './noscroll/list.vue'
import ListSimple from './noscroll/list-simple.vue'

const status = ref('noscroll')
</script>

<template>
  <div text-sm>
    <header h="42px" flex-center b-b="1px solid gray">
      虚拟列表demo
    </header>
    <div h="[calc(100vh-42px)]" p-2 flex-col>
      <div v-if="status === 'noscroll'" h="60px" flex-center>
        模拟滚动的方案【不使用原生滚动条-非高度撑开方案】
      </div>
      <div v-else h="60px" flex-center>
        原生滚动的方案【使用原生滚动条-高度撑开方案】
      </div>
      <ClientOnly>
        <div v-if="status === 'noscroll'" flex-center>
          <List />
          <div w-10 />
          <ListSimple />
        </div>
        <div v-else>
          00
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
