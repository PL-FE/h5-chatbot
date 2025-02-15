<template>
  <div
    :style="{ justifyContent: msg.isSend ? 'flex-end' : 'flex-start' }"
    class="inline-flex"
  >
    <span
      class="rounded-md px-3 py-1"
      :style="{
        backgroundColor: msg.isSend ? '#4187f2' : '#fff',
        color: msg.isSend ? '#fff' : '#000',
      }"
      @click="emits('click', msg)"
      v-html="msg.text"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  msg: {
    type: Object,
    default: () => ({}),
  },
})

const emits = defineEmits(['click'])
</script>
