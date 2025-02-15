<script setup>
import { set } from 'nprogress'
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
const sand = ({ textVar }) => {
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
      text: '机器人回复',
      isSend: false,
      time: new Date().getTime(),
    })
  }, 2000)
}
</script>

<template>
  <SafeArea>
    <div class="flex size-full flex-col">
      <div class="my-2 text-center text-xl">
        <b>AI客服</b>
      </div>
      <div class="flex flex-1 flex-col bg-[#f2f1f2] py-3 overflow-hidden">
        <div class="flex-1 overflow-auto relative">
          <div class="flex flex-col gap-3 h-full px-3">
            <ChatItem v-for="(msg, index) in msgs" :key="index" :msg="msg" />
          </div>

          <div
            v-if="isInit"
            class="absolute bottom-3 w-full flex flex-col gap-3 px-4"
          >
            <ChatItem
              class="text-sm"
              v-for="msg in msgsPrompt"
              :key="msg.text"
              :msg="msg"
              @click="sand({ textVar: msg.text })"
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
                @click="sand"
              >
                发送
              </van-button>
            </div>
          </div>
        </van-cell-group>
      </div>
    </div>
  </SafeArea>
</template>
