<script setup lang="ts">
import dayjs from 'dayjs'
import solarlunar from 'solarlunar'

const currentDate = dayjs()
const dateContent = {
  chineseCalendar: solarlunar.solar2lunar(currentDate.year(), currentDate.month() + 1, currentDate.date()),
  common: currentDate.format('YYYY年MM月DD日')
}
</script>

<template>
  <div class="w-80vw p-32px shadow-xl m-l-16px flex items-center">
    <div class="font-600 text-30px m-r-60px">今夕是何年</div>
    <div class="">
      <div class="font-500 text-22px m-b-16px">{{ dateContent.common }}</div>
      <div class="text-20px">{{ dateContent.chineseCalendar.gzYear }}年 {{ dateContent.chineseCalendar.animal }} {{ dateContent.chineseCalendar.monthCn }}{{ dateContent.chineseCalendar.dayCn }}</div>
    </div>
  </div>
</template>