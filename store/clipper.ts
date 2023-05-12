import { defineStore } from 'pinia'

export const useClipper = defineStore(
  'clipper',
  () => {
    const frames = ref<any[]>([])

    const videoSrc = ref('')

    function addFrame(frame: any) {
      frames.value.push(frame)
    }

    function setVideoSrc(src: string) {
      videoSrc.value = src
    }

    return {
      videoSrc,
      frames,
      addFrame,
      setVideoSrc,
    }
  },
)
