<script setup lang='ts'>

</script>

<template>
  <div wh-full relative>
    <div
      id="ruler-x"
      h="14px" w-full
      absolute left-0 right-0
      bg="#fafafa"
      z-999
    />
    <div
      id="ruler-y"
      w="14px" h-full
      absolute left-0 right-0
      bg="#fafafa"
      z-999
    />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
$color-main: #ccc;
#ruler-x{
  background-image: repeating-linear-gradient(90deg, $color-main 0, $color-main 1.5px, transparent 0, transparent .5cm);
  background-position: .5cm 0;
  background-repeat: no-repeat;
  background-size: 100% 5px;
}
#ruler-y{
  background-image: linear-gradient(to bottom, transparent 0, transparent .5cm, $color-main 0, $color-main 1.5px);
  background-size: 100% 5px;
  background-repeat: no-repeat;
}
</style>
