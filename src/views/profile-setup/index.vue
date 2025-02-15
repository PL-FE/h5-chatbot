<script setup>
import { ref } from 'vue'
import { useCascaderAreaData } from '@vant/area-data'
import { useRouter } from 'vue-router'
import { showFailToast, showSuccessToast, showToast } from 'vant'
import SafeArea from '@/components/SafeArea.vue'

const router = useRouter()

const options2 = useCascaderAreaData()
const options1 = [
  {
    text: '小学',
    value: '330000',
    children: [
      { text: '一年级', value: '3301010' },
      { text: '二年级', value: '3301020' },
      { text: '三年级', value: '3301030' },
      { text: '四年级', value: '33010330' },
      { text: '五年级', value: '33010230' },
      { text: '三六年级', value: '33101030' },
    ],
  },
  {
    text: '初中',
    value: '33000013',
    children: [
      { text: '一年级', value: '33010110' },
      { text: '二年级', value: '33010220' },
      { text: '三年级', value: '33010330' },
    ],
  },
  {
    text: '高中',
    value: '3300001',
    children: [
      { text: '一年级', value: '3301011011' },
      { text: '二年级', value: '3301022022' },
      { text: '三年级', value: '3301033033' },
    ],
  },
]

const showPicker = ref(false)
const fieldValue = ref([new Date().getUTCFullYear(), '01', '01'])
const fieldLabel = ref('')
const onFinish = ({ selectedValues }) => {
  fieldLabel.value = selectedValues.join('/')
  fieldValue.value = selectedValues
  console.log(11, selectedValues)
  showPicker.value = false
}

const showPicker1 = ref(false)
const fieldValue1 = ref('')
const fieldLabel1 = ref('')
const onFinish1 = ({ selectedOptions }) => {
  showPicker1.value = false
  fieldLabel1.value = selectedOptions.map((option) => option.text).join('/')
}

const showPicker2 = ref(false)
const fieldValue2 = ref('')
const fieldLabel2 = ref('')
const onFinish2 = ({ selectedOptions }) => {
  showPicker2.value = false
  fieldLabel2.value = selectedOptions.map((option) => option.text).join('/')
}

const mobile = ref('')
const smsCode = ref('')
const sendingCode = ref(false)
const countdown = ref(60)

const sendSmsCode = async () => {
  if (sendingCode.value) return
  if (!mobile.value) {
    showToast('请输入手机号')
    return
  }

  try {
    sendingCode.value = true
    // const response = await axios.post('/api/send-sms-code', { mobile: mobile.value })
    const response = await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          data: {
            success: true,
          },
        })
      }, 1000)
    })
    if (response.data.success) {
      showToast('验证码已发送')
      startCountdown()
    } else {
      showToast('验证码发送失败')
    }
  } catch (error) {
    showToast('验证码发送失败')
  }
}

const startCountdown = () => {
  let timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      countdown.value = 60
      timer = null
      sendingCode.value = false
    }
  }, 1000)
}

const onSubmit = () => {
  router.push('/chatbot')
}
</script>

<template>
  <SafeArea>
    <div class="flex size-full flex-col overflow-auto px-5 py-6">
      <div class="mb-2 text-center text-xl">
        <b>🚀 您已获得【AI智能方案定制权益】</b>
      </div>
      <div class="text-center text-sm">
        <span>完善以下信息，将为您提供匹配的咨询方案</span>
      </div>

      <div class="flex flex-1 flex-col justify-between pt-10">
        <van-form label-align="top" @submit="onSubmit">
          <van-field
            v-model="fieldLabel"
            is-link
            readonly
            label="出生年份"
            placeholder="请选择出生年份"
            @click="showPicker = true"
          />
          <van-popup
            v-model:show="showPicker"
            destroy-on-close
            round
            position="bottom"
          >
            <van-date-picker
              v-model="fieldValue"
              title="选择日期"
              :min-date="new Date(1980, 0, 1)"
              :max-date="new Date()"
              @confirm="onFinish"
              @cancel="showPicker = false"
            />
          </van-popup>

          <van-field
            v-model="fieldLabel1"
            is-link
            readonly
            label="年级"
            placeholder="请选择孩子当前就读年级"
            @click="showPicker1 = true"
          />
          <van-popup
            v-model:show="showPicker1"
            destroy-on-close
            round
            position="bottom"
          >
            <van-cascader
              v-model="fieldValue1"
              title="请选择孩子当前就读年级"
              :options="options1"
              @close="showPicker1 = false"
              @finish="onFinish1"
            />
          </van-popup>

          <van-field
            v-model="fieldLabel2"
            is-link
            readonly
            label="省份"
            placeholder="请选择省份信息"
            @click="showPicker2 = true"
          />
          <van-popup
            v-model:show="showPicker2"
            destroy-on-close
            round
            position="bottom"
          >
            <van-cascader
              v-model="fieldValue2"
              title="请选择所在地区"
              :options="options2"
              @close="showPicker2 = false"
              @finish="onFinish2"
            />
          </van-popup>

          <van-field
            v-model="mobile"
            type="tel"
            label="手机号"
            placeholder="请输入手机号"
          />

          <van-field
            v-model="smsCode"
            center
            clearable
            label="短信验证码"
            type="digit"
            placeholder="请输入短信验证码"
          >
            <template #button>
              <van-button size="small" type="primary" @click="sendSmsCode">
                {{ sendingCode ? `${countdown}s` : '发送验证码' }}
              </van-button>
            </template>
          </van-field>
        </van-form>

        <van-button
          round
          block
          type="primary"
          native-type="submit"
          class="shrink-0"
          @click="onSubmit"
        >
          提交
        </van-button>
      </div>
    </div>
  </SafeArea>
</template>
