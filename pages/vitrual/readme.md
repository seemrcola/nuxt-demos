
### 实现一个虚拟滚动列表
使用方式：
```html
<script setup lang='ts'>
import { useVitrualList } from './useVitrualList'

// ==== 5000 items ===============
const length = 10000
const list: any[] = []
for (let i = 0; i < length; i++)
  list.push({ text: i })
// ==============================

// ====== useVitrualList ==============
const vitrualList = useVitrualList(
  list,
  '.container',
  {
    itemHeight: 150,  // 每个列表项的高度
    containerHeight: 600, // 容器的高度
    scrollbar: true, // 是否显示滚动条
  },
)
const { init, renderList, renderOffsetStyle } = vitrualList
// init 调用渲染列表初始化功能
init()
// renderList 渲染的列表
// renderOffsetStyle 给子组件的样式用于设置偏移
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
        :style="renderOffsetStyle"
        bg="white"
        h="150px" 
      >
        <!-- 你的内容--------------------------------------- -->
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
      <!-- // -------------------------------------------------- -->
    </div>
  </div>
</template>
```

#### 实现思路
1. 通过 `useVitrualList` 传入列表数据，容器选择器，配置项
2. 初始化时，计算出容器的高度，列表项的高度，列表项的总数，列表项的总高度
3. 根据容器的高度，列表项的高度，列表项的总高度，计算出可视区域内的列表项的总数
4. 根据鼠标事件的deltaY，计算出滚动的距离
5. 根据滚动的距离，计算出当前滚动到的列表项的索引
6. 根据当前滚动到的列表项的索引，计算出当前可视区域内的列表项的索引范围
7. 根据当前可视区域内的列表项的索引范围，截取出当前可视区域内的列表项

这种方案无需高度撑开，模拟了滚动效果。
