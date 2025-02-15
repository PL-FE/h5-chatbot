<script setup>
import { useWindowSize } from '@vueuse/core'
import ChatItem from './ChatItem.vue'
import SafeArea from '@/components/SafeArea.vue'

const isInit = ref(true)

const msgs = ref([
  {
    text: '你好，我是智能客服，有什么可以帮到你吗？',
    isSend: false,
    time: new Date().getTime(),
  },
])

const msgsPrompt = [
  {
    text: '场景问题1',
    isSend: false,
    time: new Date().getTime(),
  },
  {
    text: '场景问题2',
    isSend: false,
    time: new Date().getTime(),
  },
  {
    text: '场景问题3',
    isSend: false,
    time: new Date().getTime(),
  },
]

const text = ref('')
const loading = ref(false)
const send = ({ textVar }) => {
  if (loading.value) {
    return
  }
  loading.value = true
  msgs.value.push({
    text: textVar || text.value,
    isSend: true,
    time: new Date().getTime(),
  })

  text.value = ''
  setTimeout(() => {
    loading.value = false
    isInit.value = false
    msgs.value.push({
      text: `${new Date().toString()}<br />` + `机器人回复`,
      isSend: false,
      time: new Date().getTime(),
    })
  }, 1000)
}
const linkService = () => {
  const weixinId = 'Zoey25877'
  window.location.href = `weixin://contacts/profile/${weixinId}`
}

const { width, height } = useWindowSize()

const offset = ref({ x: -1, y: -1 })
onMounted(() => {
  offset.value = { x: -1, y: height.value - 150 }
})
</script>

<template>
  <SafeArea>
    <div class="flex size-full flex-col">
      <div class="my-2 flex items-center justify-center gap-2 text-xl">
        <b>AI客服</b>
      </div>
      <div class="flex flex-1 flex-col overflow-hidden bg-[#f2f1f2] py-3">
        <div class="relative flex-1 overflow-auto">
          <div class="flex h-full flex-col gap-4 px-3">
            <ChatItem v-for="(msg, index) in msgs" :key="index" :msg="msg" />
          </div>

          <div
            v-if="isInit"
            class="absolute bottom-3 flex w-full flex-col gap-3 px-4"
          >
            <ChatItem
              v-for="msg in msgsPrompt"
              :key="msg.text"
              class="text-sm"
              :msg="msg"
              @click="send({ textVar: msg.text })"
            />
          </div>
        </div>
        <van-cell-group inset :style="{ border: '1px solid #ccc' }">
          <!-- 输入任意文本 -->
          <div class="flex items-center">
            <van-field v-model="text" placeholder="发消息..." />
            <div class="shrink-0 px-2">
              <van-button
                :loading="loading"
                type="primary"
                size="small"
                @click="send"
              >
                发送
              </van-button>
              <!-- <van-icon name="upgrade" size="30" @click="send" /> -->
            </div>
          </div>
        </van-cell-group>
      </div>
    </div>
    <van-floating-bubble
      :offset="offset"
      axis="xy"
      icon="chat"
      magnetic="x"
      @click="linkService"
    />
  </SafeArea>
</template>
