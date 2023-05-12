<script setup lang="ts">
import { ref } from 'vue'

const fileInputRef = ref<HTMLInputElement | null>(null)
const videoSrc = ref('')

function handleFileUpload() {
  const fileInput = fileInputRef.value!
  if (fileInput.files && fileInput.files[0]) {
    const file = fileInput.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      const fileContent = event.target?.result
      if (fileContent)
        videoSrc.value = URL.createObjectURL(file)
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div>
    <input ref="fileInputRef" type="file" accept=".mp4" @change="handleFileUpload">
    <video w="500px" h="300px" :src="videoSrc" controls playsinline />
  </div>
</template>
