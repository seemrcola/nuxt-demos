<script setup lang='ts'>
import MoveTag from './components/MoveTag.vue'
</script>

<template>
  <ClientOnly>
    <div
      class="diagonal-div"
      relative wh-full bg-gray-200 cursor-pointer
    >
      <div
        bg-orange opacity-50 h="600px" w="600px" rounded-full
        absolute left="50%" top="50%" translate-x="-50%" translate-y="-50%"
        cursor-default
      />
      <MoveTag />
    </div>
  </ClientOnly>
</template>

<style lang="scss" scoped>
// .diagonal-div {
//   background: linear-gradient(
//     to top right,
//     rgba(0, 0, 0, 0) 0%,
//     rgba(0, 0, 0, 0) calc(50% - 1px),
//     rgba(0, 0, 0, 1) 50%,
//     rgba(0, 0, 0, 0) calc(50% + 1px),
//     rgba(0, 0, 0, 0) 100%
//   ), linear-gradient(
//     to bottom right,
//     rgba(0, 0, 0, 0) 0%,
//     rgba(0, 0, 0, 0) calc(50% - 1px),
//     rgba(0, 0, 0, 1) 50%,
//     rgba(0, 0, 0, 0) calc(50% + 1px),
//     rgba(0, 0, 0, 0) 100%
//   );
// }
.diagonal-div::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #000; /* 横轴颜色 */
  transform: translateY(-50%);
}

.diagonal-div::after {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 1px;
  height: 100%;
  background-color: #000; /* 纵轴颜色 */
  transform: translateX(-50%);
}
</style>
