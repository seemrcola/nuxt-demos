<script setup lang='ts'>

</script>

<template>
  <div>
    <div>
      <div text-sm text-center b-b="1px gray dashed" py-2>
        <strong> Basic Components </strong>
      </div>
      <div flex flex-wrap justify-around p-2>
        <div flex-center class="comp-item">
          <div i-carbon:touch-1 />
        </div>
        <div flex-center class="comp-item">
          <div i-ion:images-outline />
        </div>
        <div flex-center class="comp-item">
          <div i-material-symbols:text-fields-rounded />
        </div>
        <div flex-center class="comp-item">
          <div i-material-symbols:music-video-outline-rounded />
        </div>
      </div>
    </div>
    <div>
      <div text-sm text-center b-b="1px gray dashed" py-2>
        <strong> Basic Shapes </strong>
      </div>
      <div flex flex-wrap justify-around p-2>
        <div flex-center class="comp-item">
          <div i-ph:circle-duotone />
        </div>
        <div flex-center class="comp-item">
          <div i-material-symbols:rectangle />
        </div>
        <div flex-center class="comp-item">
          <div i-mdi:triangle />
        </div>
        <div flex-center class="comp-item">
          <div i-ic:outline-star />
        </div>
        <div flex-center class="comp-item">
          <div i-material-symbols:straighten-outline />
        </div>
        <div flex-center class="comp-item">
          <div i-eos-icons:bubble-loading />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
  .comp-item {
    width: 45%;
    height: 25px;
    margin: 5px 0 5px 0;
    border: 1px dashed gray;
    cursor: pointer;
    transition: all .5s;
    &:hover {
      color: orange
    }
  }
</style>
