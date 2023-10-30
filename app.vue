<script setup lang="ts">
import useNotify from '~/composables/useNotify'
import dayjs from 'dayjs'

const cacheKeyPrefix = 'notify'
const notify = useNotify()

const setting = useSetting()
const { end } = setting.value.base

function checkTime() {
  const currentDate = dayjs()
  const cacheKey = `${cacheKeyPrefix}_${currentDate.format('YYYY-MM-DD')}`
  const hour = currentDate.diff(`${currentDate.format('YYYY-MM-DD')} ${end}`, 'hours')
  const minutes = currentDate.diff(`${currentDate.format('YYYY-MM-DD')} ${end}`, 'minutes')
  if (hour === 0 && !localStorage.getItem(cacheKey)) {
    notify.notify({
      title: "倒计时",
      body: `还有${Math.abs(minutes)}分钟!`
    })
    localStorage.setItem(cacheKey, 'done')
  }
}
checkTime()

let timer: number
onMounted(async () => {
  timer = window.setInterval(() => {
    checkTime()
  }, 1000 * 60 * 60)
  const { data } = await useFetch('/api/hello')
  console.log(data.value?.data)
})

onBeforeUnmount(() => {
  window.clearInterval(timer)
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
