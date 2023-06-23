<script setup lang='ts'>
import { onMounted } from 'vue'

interface ImageDesc {
  url: string
  width: number
  height: number
  renderWidth: number
  renderHeight: number
  desc?: string
}

const props = withDefaults(defineProps<{
  images: ImageDesc[]
  col: number
  colWidth: number
}>(), {
  images: () => [],
  col: 0,
  colWidth: 0,
})

const lazyList: ImageDesc[][] = []
const lazyListHeight: number[] = []
for (let i = 0; i < props.col; i++) {
  lazyList.push([])
  lazyListHeight.push(0)
}

props.images.forEach((image) => {
  image.renderWidth = props.colWidth
  image.renderHeight = props.colWidth * (image.height / image.width)
  const minIndex = lazyListHeight.indexOf(Math.min(...lazyListHeight))
  lazyList[minIndex].push(image)
  lazyListHeight[minIndex] += image.renderHeight
})

const lazyImagesObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const lazyImage = entry.target as HTMLImageElement
      lazyImage.src = lazyImage.dataset.src!
      lazyImage.classList.remove('lazy-image')
      lazyImagesObserver.unobserve(lazyImage)
    }
  })
})

onMounted(() => {
  const lazyImages = document.querySelectorAll('.lazy-image')
  lazyImages.forEach((lazyImage) => {
    lazyImagesObserver.observe(lazyImage)
  })
})
</script>

<template>
  <div
    class="lazy-images-wrapper"
    flex justify-around flex-wrap
  >
    <div
      v-for="(item, idx) of lazyList" :key="`the${idx}list`"
      :style="{ width: `${props.colWidth}px` }"
    >
      <div v-for="(imageinfo, index) of item" :key="index">
        <img
          :data-src="imageinfo.url"
          class="lazy-image"
          :style="{
            width: `${imageinfo.renderWidth}px`,
            height: `${imageinfo.renderHeight}px`,
          }"
        >
        <p>{{ imageinfo.desc }}</p>
      </div>
    </div>
  </div>
</template>
