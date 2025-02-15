<template>
  <div
    ref="floatButton"
    class="floating-button"
    :style="{
      bottom: position.bottom + 'px',
      left: position.left + 'px',
      transition: isDragging ? 'none' : 'left 0.3s ease, bottom 0.3s ease',
    }"
    @mousedown="startDrag"
    @touchstart="startDrag"
  >
    <slot />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { Icon as VanIcon } from 'vant'

const { width, height } = useWindowSize()
const floatButton = ref(null)
const position = ref({ bottom: 100, left: 20 })
const isDragging = ref(false)

const startDrag = (event) => {
  event.preventDefault()
  isDragging.value = true
  const startX = event.clientX || event.touches[0].clientX
  const startY = event.clientY || event.touches[0].clientY
  const initialLeft = position.value.left
  const initialbottom = position.value.bottom

  const onMove = (moveEvent) => {
    if (!isDragging.value) return
    const clientX = moveEvent.clientX || moveEvent.touches[0].clientX
    const clientY = moveEvent.clientY || moveEvent.touches[0].clientY

    position.value.left = Math.min(
      Math.max(initialLeft + clientX - startX, 0),
      width.value - 50
    )
    position.value.bottom = Math.min(
      Math.max(initialbottom + clientY - startY, 0),
      height.value - 50
    )
  }

  const onEnd = () => {
    isDragging.value = false
    position.value.left =
      position.value.left < width.value / 2 ? 10 : width.value - 50
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseup', onEnd)
    window.removeEventListener('touchmove', onMove)
    window.removeEventListener('touchend', onEnd)
  }

  window.addEventListener('mousemove', onMove)
  window.addEventListener('mouseup', onEnd)
  window.addEventListener('touchmove', onMove)
  window.addEventListener('touchend', onEnd)
}

onMounted(() => {
  position.value.left = width.value - 50
})
</script>

<style scoped>
.floating-button {
  position: fixed;
  width: 40px;
  height: 40px;
  background-color: #1989fa;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  cursor: grab;
  user-select: none;
  transition: left 0.3s ease, bottom 0.3s ease;
}
</style>
