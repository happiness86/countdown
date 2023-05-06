<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import dayjs from 'dayjs'
import holiday from '~/holiday.json'

interface Holiday {
  name: string
  value: string
  count?: number
}

const setting = useSetting()
const { start, end, countNoonBreak, noonBreak } = setting.value.base

function getKnockOffDiff() {
  const { start, end, countNoonBreak, noonBreak } = setting.value.base
  const noonBreakTime = countNoonBreak ? noonBreak * 60 * 60 * 1000 : 0
  const workHours = countNoonBreak ? (+end.split(':')[0] - +start.split(':')[0]) * 60 * 60 * 1000 : 9 * 60 * 60 * 1000
  return {
    knockOffDiff: dayjs().valueOf() - dayjs(`${dayjs().format('YYYY-MM-DD')} ${start}`).valueOf() - noonBreakTime,
    workHours
  }
}
function getCountDownDiff() {
  return dayjs().valueOf() - dayjs(`${lastHoliday.value} 00:00:00`).valueOf()
}

const currentDate = dayjs()

const remainingHoliday: Holiday[] = []
const pastHoliday: Holiday[] = []
holiday.forEach(item => {
  if (currentDate.isBefore(item.value)) {
    remainingHoliday.push(item)
  } else {
    pastHoliday.push(item)
  }

})

const nextHoliday = remainingHoliday[0]
const lastHoliday = pastHoliday[pastHoliday.length - 1]

const countdown = ref(nextHoliday ? dayjs(`${nextHoliday.value} ${end}`).subtract(1, 'day') : dayjs())
const countdownDiff = getCountDownDiff()
const countdownTotal = dayjs(`${nextHoliday.value} ${end}`).subtract(1, 'day').valueOf() - dayjs(`${lastHoliday.value} 00:00:00`).valueOf()
const countdownPercentage = ref(countdownDiff >= countdownTotal ? 100 : Math.ceil(countdownDiff / countdownTotal * 100))

const knockOff = ref(dayjs(`${dayjs().format('YYYY-MM-DD')} ${end}`))
const { knockOffDiff, workHours } = getKnockOffDiff()
const knockOffPercentage = ref(knockOffDiff >= workHours ? 100 : Math.ceil(knockOffDiff / workHours * 100))

let knockOffInterval: number
let countdownInterval: number
onMounted(() => {
  knockOffInterval = window.setInterval(() => {
    const {knockOffDiff: newDiff, workHours: newWorkHours} = getKnockOffDiff()
    knockOffPercentage.value = Math.ceil(newDiff / newWorkHours * 100)
    if (newDiff >= newWorkHours) {
      window.clearInterval(knockOffInterval)
      knockOffPercentage.value = 100
    }
  }, 1000)

  countdownInterval = window.setInterval(() => {
    const newDiff = getCountDownDiff()
    countdownPercentage.value = Math.ceil(newDiff / countdownTotal * 100)
    if (newDiff >= countdownTotal) {
      window.clearInterval(countdownInterval)
      countdownPercentage.value = 100

    }
  }, 1000 * 60)
})

onUnmounted(() => {
  clearInterval(knockOffInterval!)
  clearInterval(countdownInterval!)
})
</script>
<template>
  <div>
    <client-only>
      <div class="m-t-48px text-20px font-500 shadow-xl m-l-16px p-32px w-80vw">
        <div class="m-b-16px">距离<span class="text-rose">下班</span>还有：</div>
        <div class="flex items-center m-b-16px">
          <div class="i-solar-clock-circle-bold-duotone text-rose text-22px m-r-8px"></div>
          <el-countdown format="HH [时] mm [分] ss [秒]" :value="knockOff" class=" text-rose"></el-countdown>
        </div>
        <el-progress :percentage="knockOffPercentage" :stroke-width="15" :duration="10" striped striped-flow
          class="w-50vw" />
      </div>
      <div class="m-t-48px text-20px font-500 shadow-xl m-l-16px p-32px w-80vw">
        <div class="m-b-16px">距离<span class="text-rose">{{ nextHoliday.name }}</span>放假还有：</div>
        <div class="flex items-center m-b-16px">
          <div class="i-solar-clock-circle-bold-duotone text-rose text-22px m-r-8px"></div>
          <el-countdown format="DD [天] HH [时] mm [分] ss [秒]" :value="countdown" class=" text-rose"></el-countdown>
        </div>
        <el-progress :percentage="countdownPercentage" :stroke-width="15" :duration="10" striped striped-flow
          class="w-50vw" />
      </div>
    </client-only>
  </div>
</template>