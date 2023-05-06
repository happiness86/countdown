<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const showSetting = ref(false)
const openSetting = () => {
  showSetting.value = true
}
</script>
<template>
  <div flex="~ items-center justify-between" b="b-1px b-solid" p="t-16px b-16px l-10vw r-10vw"
    position="fixed top-0 left-0" w="80vw" class="b-b-hb z-100">
    <div class="flex items-center">
      <img width="40" height="40" src="~/assets/icons/countdown.svg" class="animate-duration-2000 animate-iteration-infinite animate-rotate-out" hover="animate-none"/>
      <span class="font-500 text-2xl m-l-10px">Count Down</span>
    </div>
    <div class="flex items-center">
      <div class="text-2xl m-r-16px op-40" hover="op-80" :class="[!isDark ? 'i-solar-sun-linear' : 'i-solar-moon-broken']"
        @click="toggleDark()"></div>
      <div class="i-solar-settings-linear text-2xl  op-40" hover="op-80" @click="openSetting"></div>
    </div>
    <el-dialog :model-value="showSetting" width="60vw" title="设置" :close-on-click-modal="false" @close="() => showSetting = false">
      <Setting></Setting>
    </el-dialog>
  </div>
</template>