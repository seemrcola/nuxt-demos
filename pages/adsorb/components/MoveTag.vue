<script setup lang='ts'>
type Direction = 'top' | 'right' | 'bottom' | 'left'
const currentDirection = ref<Direction>('top') // 当前方向
const currentAngle = ref(0) // 当前角度

const RADIUS = 500 / 2

const css = ref('')

// drag ---------------------------------------------------
const domRef = ref<HTMLElement | null>(null)
let dragFlag = false
let skewing: { x: number; y: number }

function mousedownHanlder(e: MouseEvent) {
  dragFlag = true
  const { clientX, clientY } = e
  const rect = domRef.value!.getBoundingClientRect()
  const { left: preLeft, top: preTop } = rect
  skewing = { x: clientX - preLeft, y: clientY - preTop }
  document.addEventListener('mousemove', mousemoveHanlder)
  document.addEventListener('mouseup', mouseupHanlder)
}

function mousemoveHanlder(e: MouseEvent) {
  if (!dragFlag)
    return
  const { clientX, clientY } = e
  const { x, y } = skewing
  const offsetX = clientX - x
  const offsetY = clientY - y

  requestAnimationFrame(
    () => {
      let rotate = 0
      if (currentDirection.value === 'left')
        rotate = -90
      if (currentDirection.value === 'right')
        rotate = 90
      css.value = `
        left: ${offsetX}px; top: ${offsetY}px;
        transform: '';
        rotate: ${rotate}deg;
      `
    },
  )
}
function mouseupHanlder() {
  dragFlag = false
  document.removeEventListener('mousemove', mousemoveHanlder)
  document.removeEventListener('mouseup', mouseupHanlder)
}
// --------------------------------------------------------

// show----------------------------------------------------
function moveTagByDirection(direction: Direction) {
  css.value = 'transition: all 0.3s;'
  switch (direction) {
    case 'top':
      css.value += `
        left: 50%; top: 0;
        transform: translateX(-50%);
      `
      break
    case 'right':
      css.value += `
        right: 0; top: 50%;
        transform: translateY(-50%);
        rotate: 90deg;
      `
      break
    case 'bottom':
      css.value += `
        left: 50%; bottom: 0%;
        transform: translateX(-50%);
      `
      break
    case 'left':
      css.value += `
        left: 0; top: 50%;
        transform: translateY(-50%);
        rotate: 90deg;
      `
      break
  }
}

function calcPointerPosition(bodyAngle: number, currentAngle: number) {
  if (currentAngle < bodyAngle && currentAngle > -bodyAngle)
    return 'right'
  if (currentAngle < -bodyAngle && currentAngle > -180 + bodyAngle)
    return 'top'
  if (currentAngle < -180 + bodyAngle || currentAngle > 180 - bodyAngle)
    return 'left'
  if (currentAngle < 180 - bodyAngle && currentAngle > bodyAngle)
    return 'bottom'
}

function watchPointerPosition(e: MouseEvent) {
  const { clientX, clientY } = e
  const bodyRect = document.body.getBoundingClientRect()
  const centerBodyX = bodyRect.width / 2
  const centerBodyY = bodyRect.height / 2
  // 如果坐标在RADIUS范围内 无事发生
  if (
    Math.abs(clientX - centerBodyX) < RADIUS
    && Math.abs(clientY - centerBodyY) < RADIUS
  )
    return 'center'
  // 如果坐标在RADIUS范围外 则区分四个方向
  /**
   *        top
   *   left      right
   *       bottom
   */
  const x = clientX - centerBodyX
  const y = clientY - centerBodyY
  // 计算body的角度
  const bodyAngle = (Math.atan2(centerBodyY, centerBodyX)) * 180 / Math.PI
  // 计算hover角度
  const angle = Math.atan2(y, x)
  currentAngle.value = angle * 180 / Math.PI
  // 计算方位
  currentDirection.value = calcPointerPosition(bodyAngle, currentAngle.value)!
  // 移动tag
  requestAnimationFrame(() => {
    moveTagByDirection(currentDirection.value)
  })
}

document.addEventListener('mousemove', watchPointerPosition)

onUnmounted(() => {
  document.removeEventListener('mousemove', watchPointerPosition)
})
</script>

<template>
  <div
    ref="domRef"
    h="28px" w="120px"
    flex-center px-1
    bg-light rounded="md" shadow="md"
    absolute z-9999
    :style="css"
    @mousedown="mousedownHanlder"
  >
    <div i-vscode-icons:file-type-nuxt />
    <div flex-1 flex-center text-xs>
      {{ currentDirection }} {{ ~~currentAngle }}
    </div>
    <div i-icon-park:healthy-recognition />
  </div>
</template>
