<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const openSetting = () => {
  ElMessage.warning('coming soon!')
}
</script>
<template>
  <div class="flex items-center justify-between w-80vw border-b border-b-solid p-t-16px p-b-16px p-l-10vw p-r-10vw fixed top-0 left-0" style="border-color: var(--border-color)">
    <div class="flex items-center">
      <img width="40" height="40" src="~/assets/icons/countdown.svg" />
      <span class="font-500 text-2xl m-l-10px">Count Down</span>
    </div>
    <div class="flex items-center">
      <div class="text-2xl m-r-16px op-40" hover="op-80" :class="[!isDark ? 'i-solar-sun-linear' : 'i-solar-moon-broken']" @click="toggleDark()"></div>
      <div class="i-solar-settings-linear text-2xl  op-40"  hover="op-80" @click="openSetting"></div>
    </div>
  </div>
</template>