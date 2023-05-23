<script setup lang='ts'>
import List from './noscroll/list.vue'
import ListSimple from './noscroll/list-simple.vue'
import ListScrollSimple from './scroll/list-simple.vue'
import ListScroll from './scroll/list.vue'

const status = ref('scroll')
function change(type: string) {
  status.value = type
}
</script>

<template>
  <div text-sm>
    <header h="42px" flex-center b-b="1px solid gray">
      <div btn @click="change('scroll')">
        原生滚动条方案
      </div>
      <div w-10 />
      <div btn @click="change('noscroll')">
        虚拟滚动条方案
      </div>
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
        <div v-else flex-center>
          <ListScroll />
          <div w-10 />
          <ListScrollSimple />
        </div>
      </ClientOnly>
    </div>
  </div>
</template>
