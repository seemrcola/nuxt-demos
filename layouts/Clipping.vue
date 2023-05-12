<script setup lang='ts'>

</script>

<template>
  <div wh-full overflow-hidden>
    <div flex h="70vh" b-b="1px solid #eee">
      <div flex-1>
        <slot name="video" />
      </div>
      <div flex-1>
        <slot name="player" />
      </div>
    </div>

    <div h="30vh">
      <slot name="frame" />
    </div>
  </div>
</template>
