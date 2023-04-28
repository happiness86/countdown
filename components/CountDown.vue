<script setup lang="ts">
import dayjs from 'dayjs'
import holiday from '~/holiday.json'

const currentDate = dayjs()

const holidayArr = holiday.filter(item => {
  return currentDate.isBefore(item.value)
})

const nextHoliday = holidayArr[0]


const countdown = ref(nextHoliday ? dayjs(`${nextHoliday.value} 19:00:00`).subtract(1, 'day') : dayjs())

const diff = dayjs().valueOf() - dayjs(`${dayjs().format('YYYY-MM-DD')} 10:00:00`).valueOf()
const percentage = Math.ceil(diff / (9 * 60 * 60 * 1000) * 100)
</script>
<template>
  <div class="m-t-48px text-20px font-500 shadow-xl m-l-16px p-32px w-80vw">
    <div class="m-b-16px">距离<span class="text-rose">{{ nextHoliday.name }}</span>放假还有：</div>
    <div class="flex items-center m-b-16px">
      <div class="i-solar-clock-circle-bold-duotone text-rose text-22px m-r-8px"></div>
      <el-countdown format="DD [天] HH [时] mm [分] ss [秒]" :value="countdown" class=" text-rose"></el-countdown>
    </div>
    <el-progress :percentage="percentage" :stroke-width="15" striped striped-flow class="w-50vw" />
  </div>
</template>