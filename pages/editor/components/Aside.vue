<script setup lang='ts'>
import { CheckoutTypes } from '~/enums/checkout.enum'

const emits = defineEmits(['checkout'])
function checkout(name: string) {
  console.log(name)
  emits('checkout', name)
}
</script>

<template>
  <div
    flex flex-col items-center
    h-full b-r="1px solid gray"
    class="icon-wrapper"
  >
    <Ntag :text="CheckoutTypes.COMPONENTS" @click="checkout(CheckoutTypes.COMPONENTS)">
      <div my-2 h-6 w-6 i-ep:element-plus />
    </Ntag>
    <Ntag :text="CheckoutTypes.LAYERS" @click="checkout(CheckoutTypes.COMPONENTS)">
      <div my-2 h-5 w-5 i-simple-icons:deno />
    </Ntag>
    <Ntag :text="CheckoutTypes.TOYS" @click="checkout(CheckoutTypes.COMPONENTS)">
      <div my-2 h-5 w-5 i-simple-icons:bun />
    </Ntag>
  </div>
</template>

<style lang="scss">
.icon-wrapper {
  > div {
    transition: all 0.5s;
    cursor: pointer;
    &:hover {
      color: rgba($color: orange, $alpha: 0.7);
    }
  }
}
</style>
