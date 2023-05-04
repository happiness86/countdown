<script setup lang="ts">
import dayjs from 'dayjs'
import solarlunar from 'solarlunar'

const currentDate = dayjs()
const dateContent = {
  chineseCalendar: solarlunar.solar2lunar(currentDate.year(), currentDate.month() + 1, currentDate.date()),
  common: currentDate.format('YYYY年MM月DD日')
}

const faceByDay = ref('i-twemoji-face-exhaling')

switch (currentDate.day()) {
  case 0:
    faceByDay.value = 'i-twemoji-clown-face'
    break
  case 1:
    faceByDay.value = 'i-twemoji-face-exhaling'
    break
  case 2:
    faceByDay.value = 'i-twemoji-crying-face'
    break
  case 3:
    faceByDay.value = 'i-twemoji-expressionless-face'
    break
  case 4:
    faceByDay.value = 'i-twemoji-smirking-face'
    break
  case 5:
    faceByDay.value = 'i-twemoji-partying-face'
    break
  case 6:
    faceByDay.value = 'i-twemoji-smiling-face-with-sunglasses'
    break
}
</script>

<template>
  <div class="w-80vw p-32px shadow-xl m-l-16px flex items-center">
    <div class="font-600 text-30px m-r-60px">今夕是何年</div>
    <div>
      <div class="font-500 text-22px m-b-16px">{{ dateContent.common }}</div>
      <div class="text-20px">{{ dateContent.chineseCalendar.gzYear }}年 {{ dateContent.chineseCalendar.animal }} {{
        dateContent.chineseCalendar.monthCn }}{{ dateContent.chineseCalendar.dayCn }}</div>
    </div>
    <div :class="faceByDay" class="text-48px m-l-200px"></div>
  </div>
</template>