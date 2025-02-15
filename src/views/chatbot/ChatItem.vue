<template>
  <div
    :style="{ justifyContent: msg.isSend ? 'flex-end' : 'flex-start' }"
    class="inline-flex"
  >
    <span
      class="px-3 py-1 rounded-md"
      :style="{
        backgroundColor: msg.isSend ? '#58be6a' : '#fff',
        color: msg.isSend ? '#fff' : '#000',
      }"
    >
      {{ msg.text }}
    </span>
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: Object,
    default: () => ({}),
  },
})
</script>
