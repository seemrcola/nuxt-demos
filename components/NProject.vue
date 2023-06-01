<script setup lang='ts'>
const props = defineProps<{
  list: any[]
}>()
const emits = defineEmits<{
  (e: 'goto', payload: string): void
}>()

function routerPush(title: string) {
  emits('goto', title)
}
</script>

<template>
  <div flex-center flex-wrap>
    <div
      v-for="(item) of props.list" :key="item.title"
      h="70px" w="300px" rounded-1 bg-white
      b="1px dashed gray"
      px-5 m-10
      flex items-center
      transition duration-400
      hover:bg-orange-300
      cursor-pointer

      @click="routerPush(item.title)"
    >
      <div
        :class="item.icon" h="40px" w="40px"
        flex-center mr-8
        transition duration-400
      />
      <div flex-1>
        <div font-700>
          {{ item.title }}
        </div>
        <div text-sm text-gray-500>
          {{ item.desc }}
        </div>
      </div>
    </div>
  </div>
</template>
