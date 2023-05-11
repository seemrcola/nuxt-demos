import { defineStore } from 'pinia'

export const useCanvasRender = defineStore(
  'render',
  () => {
    const components = ref<any[]>([])

    const scale = ref(0.7)

    function addComponent(component: any) {
      components.value.push(component)
    }

    // 滚轮缩放
    function handleMouseWheel(e: WheelEvent) {
      if (!window.$KeyboardActive.space)
        return
      if (e.deltaY > 0)
        scale.value -= 0.05
      else
        scale.value += 0.05
      // 设置上下限
      scale.value = Math.max(0.5, scale.value)
      scale.value = Math.min(3, scale.value)
    }

    const canvasStyle = computed(() => ({
      transform: `scale(${scale.value})`,
      transformOrigin: 'top left',
    }))

    const componentStyle = computed(() =>
      (component: any) => ({
        transform: `scale(${component.scale}})`,
        left: `${component.left}px`,
        top: `${component.top}px`,
      }))

    return {
      addComponent,
      components,
      scale,
      canvasStyle,
      handleMouseWheel,
      componentStyle,
    }
  },
)
