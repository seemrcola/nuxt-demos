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
    <header h="50px" flex-center bg="#fafafa">
      <div btn @click="change('scroll')">
        原生滚动条方案
      </div>
      <div w-10 />
      <div btn @click="change('noscroll')">
        虚拟滚动条方案
      </div>
    </header>
    <div h="[calc(100vh-100px)]" p-2 flex-col>
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
    <footer h="50px" bg="#fafafa" flex-center>
      <div>不定高情况下的觉得性能一般，具体实现方案可以参考这个文章</div>
      <div>
        <a
          target="_blank"
          href="https://free_pan.gitee.io/freepan-blog"
        >
          <div i-ic:round-insert-link />
        </a>
      </div>
    </footer>
  </div>
</template>
