<script setup lang='ts'>
import List from './components/list.vue'
</script>

<template>
  <div text-sm>
    <header h="42px" flex-center b-b="1px solid gray">
      虚拟列表demo
    </header>
    <div h="[calc(100vh-42px)]" p-2 flex-col>
      <div h="60px" flex-center>
        模拟滚动的方案【不使用原生滚动条-非高度撑开方案】
      </div>
      <ClientOnly>
        <List flex-center />
      </ClientOnly>
    </div>
  </div>
</template>
