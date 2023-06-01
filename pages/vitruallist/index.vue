<script setup lang='ts'>
import List from './noscroll/list.vue'
import ListSimple from './noscroll/list-simple.vue'
import ListScrollSimple from './scroll/list-simple.vue'
import ListScroll from './scroll/list.vue'
import ListScrollDynamic from './scroll/list-dynamic.vue'

const status = ref('scroll')
function change(type: string) {
  status.value = type
}
</script>

<template>
  <div text-sm>
    <header h="50px" flex-center bg="#fafafa" text-sm>
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
          <div w-10 />
          <ListScrollDynamic />
        </div>
      </ClientOnly>
    </div>
    <footer h="50px" bg="#fafafa" flex-center text-sm>
      <div>不定高情况下尚未实现完毕，具体实现方案可以参考这个文章</div>
      <div flex-center>
        <a
          target="_blank"
          href="https://free_pan.gitee.io/freepan-blog"
        >
          <div i-ic:round-insert-link />
        </a>
        <div>和这个文章</div>
        <a
          target="_blank"
          href="https://github.com/chenqf/frontEndBlog/issues/16"
        >
          <div i-ic:round-insert-link />
        </a>
      </div>
    </footer>
  </div>
</template>
