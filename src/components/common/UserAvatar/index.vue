<script setup lang='ts'>
import { computed, ref, watch } from 'vue'
import { NAvatar, NSelect } from 'naive-ui'
import { useUserStore } from '@/store'
import defaultAvatar from '@/assets/avatar.jpg'
import { isString } from '@/utils/is'
// import type { SelectMixedOption } from '@/path/to/types'

const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)
const options = [
  { label: 'ChatGPT3.5', value: 'option1' },
  { label: '基于ChatGPT3.5的医疗分诊', value: 'option2' },
  { label: '基于ChatGLM的医疗问询', value: 'option3' },
]
const selectedOption = ref('option2')

watch(selectedOption, (newOption) => {
  userStore.userInfo.option = newOption
})
</script>

<template>
  <div>
    <div class="w-100 h-20">
      <NSelect
        v-model:value="selectedOption"
        size="large"
        placeholder="Select an option"
        :options="options"
      />
    </div>
    <div class="flex items-center overflow-hidden">
      <div class="w-10 h-10 overflow-hidden rounded-full shrink-0">
        <template v-if="isString(userInfo.avatar) && userInfo.avatar.length > 0">
          <NAvatar
            size="large"
            round
            :src="userInfo.avatar"
            :fallback-src="defaultAvatar"
          />
        </template>
        <template v-else>
          <NAvatar size="large" round :src="defaultAvatar" />
        </template>
      </div>
      <div class="flex-1 min-w-0 ml-2">
        <h2 class="overflow-hidden font-bold text-md text-ellipsis whitespace-nowrap">
          {{ userInfo.name ?? 'simin' }}
        </h2>
        <p class="overflow-hidden text-xs text-gray-500 text-ellipsis whitespace-nowrap">
          <span
            v-if="isString(userInfo.description) && userInfo.description !== ''"
            v-html="userInfo.description"
          />
        </p>
      </div>
    </div>
  </div>
</template>
