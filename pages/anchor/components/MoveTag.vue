<script setup lang='ts'>
type Direction = 'top' | 'right' | 'bottom' | 'left'
const currentDirection = ref<Direction>('top') // 当前方向
const currentAngle = ref(0) // 当前角度

const RADIUS = 500 / 2
const HEIGHT = 36
const WIDTH = 140

const css = ref<any>({})

// show----------------------------------------------------
function moveTagByDirection(direction: Direction) {
  const FIXED = 20
  const skewTransform = `translateX(${-HEIGHT / 2}px)`
  const skewPosition = `-${(WIDTH - HEIGHT) / 2 - FIXED}px`
  switch (direction) {
    case 'top':
      css.value
      = { left: '50%', top: `${0 + FIXED}px`, transform: 'translateX(-50%)', rotate: '0deg' }
      break
    case 'right':
      css.value
      = { right: skewPosition, top: '50%', transform: skewTransform, rotate: '90deg' }
      break
    case 'bottom':
      css.value
      = { left: '50%', bottom: `${0 + FIXED}px`, transform: 'translateX(-50%)', rotate: '0deg' }
      break
    case 'left':
      css.value
      = { left: skewPosition, top: '50%', transform: skewTransform, rotate: '90deg' }
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
  const d = calcPointerPosition(bodyAngle, currentAngle.value)!
  if (d === currentDirection.value)
    return
  currentDirection.value = d
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
  <Teleport to="body">
    <div
      box-border px-1
      h="36px" w="140px" rounded="18"
      flex-center
      bg-light shadow="md"
      absolute z-9999
      :style="css"
      transition duration-400
    >
      <div h="28px" w="28px" flex-center bg="gray-500" rounded="50%">
        <div h="24px" w="24px" flex-center bg-light rounded="50%">
          <div i-logos:github-icon />
        </div>
      </div>
      <div flex-1 flex-center text-xs>
        {{ currentDirection }} {{ ~~currentAngle }} <span color-orange>deg</span>
      </div>
    </div>
  </Teleport>
</template>
