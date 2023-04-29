<script setup lang='ts'>
import { computed, ref } from 'vue'
import { NButton, NInput, NModal, useMessage } from 'naive-ui'
import { fetchVerify } from '@/api'
import { useAuthStore } from '@/store'
import Icon403 from '@/icons/403.vue'

interface Props {
  visible: boolean
}

defineProps<Props>()

const authStore = useAuthStore()

const ms = useMessage()

const loading = ref(false)
const token = ref('')
const username = ref('')
const password = ref('')

const disabled = computed(() => !password.value.trim() || loading.value)

async function handleVerify() {
  const usernamev = username.value.trim()
  const passwordv = password.value.trim()

  if (!usernamev)
    return
  if (!passwordv)
    return

  try {
    loading.value = true
    const response = await fetchVerify(
      {
        username: username.value,
        password: password.value,
      })
    ms.info(response.data)
    // 用户登录成功后操作; 这块逻辑存在问题
    // if (response.status === 'Success') {
    //   authStore.setToken(usernamev)
    //   ms.success('success')
    //   window.location.reload()
    // }
    // else {
    //   ms.error(response.message ?? 'error') //
    //   authStore.removeToken()
    //   token.value = ''
    // }
  }
  catch (error: any) {
    // console.error(error)
    // ms.info(error)
    ms.error(error.message ?? 'error')
    authStore.removeToken()
    token.value = ''
  }
  finally {
    loading.value = false
  }
}

// async function handleVerify() {
//   const usernamev = username.value.trim()
//   const passwordv = password.value.trim()

//   if (!usernamev)
//     return
//   if (!passwordv)
//     return

//   try {
//     loading.value = true
//     await fetchVerify(
//       {
//         username: username.value,
//         password: password.value,
//       })
//     authStore.setToken(usernamev)
//     ms.success('success')
//     window.location.reload()
//   }
//   catch (error: any) {
//     ms.error(error.message ?? 'error')
//     // ms.error('登录错误，请检查用户名和密码')
//     authStore.removeToken()
//     token.value = ''
//   }
//   finally {
//     loading.value = false
//   }
// }

function handlePress(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    handleVerify()
  }
}
</script>

<template>
  <NModal :show="visible" style="width: 90%; max-width: 640px">
    <div class="p-10 bg-white rounded dark:bg-slate-800">
      <div class="space-y-4">
        <header class="space-y-2">
          <h2 class="text-2xl font-bold text-center text-slate-800 dark:text-neutral-200">
            403
          </h2>
          <p class="text-base text-center text-slate-500 dark:text-slate-500">
            {{ $t('common.unauthorizedTips') }}
          </p>
          <Icon403 class="w-[200px] m-auto" />
        </header>
        <NInput v-model:value="username" placeholder="输入用户名, 测试账号test" @keypress="handlePress" />
        <NInput v-model:value="password" type="password" placeholder="输入密码，测试账号密码123456" @keypress="handlePress" />
        <NButton
          block
          type="primary"
          :disabled="disabled"
          :loading="loading"
          @click="handleVerify"
        >
          <!-- <NButton
          block
          type="primary"
          :loading="loading"
          @click="handleVerify"
        > -->
          登录
          <!-- {{ $t('common.verify') }} -->
        </NButton>
        <NButton
          block
          type="primary"
        >
          注册
        </NButton>
      </div>
    </div>
  </NModal>
</template>
