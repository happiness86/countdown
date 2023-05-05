<script setup lang="ts">
import useNotify from '~/composables/useNotify'
import dayjs from 'dayjs'

const cacheKeyPrefix = 'notify'
const notify = useNotify()

function checkTime() {
  const currentDate = dayjs()
  const day = currentDate.day()
  const cacheKey = `${cacheKeyPrefix}_${currentDate.format('YYYY-MM-DD')}`
  if (day > 0 && day < 6) {
    const hour = currentDate.hour()
    if (hour >= 18 && hour < 19 && !localStorage.getItem(cacheKey)) {
      const minutes = currentDate.minute()
      notify.notify({
        title: "倒计时",
        body: `还有${60 - minutes - 1}分钟!`
      })
      localStorage.setItem(cacheKey, 'done')
    }
  }
}

checkTime()

let timer: number
onMounted(() => {
  timer = window.setInterval(() => {
    checkTime()
  }, 1000 * 60 * 60)
})
</script>
<template>
  <div class="h-full p-t-120px font-sans w-80vw m-a">
    <NuxtLayout>
      <AppHeader></AppHeader>
      <DateNow></DateNow>
      <CountDown></CountDown>
    </NuxtLayout>
  </div>
</template>
<style>
@import 'main.css';
@import url(https://fonts.bunny.net/css?family=aldrich:400|zcool-kuaile:400);
</style>
