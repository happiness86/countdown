<script setup lang="ts">
const settingData = useSetting()

const setting = [
  {
    label: '基本设置',
    value: 'base'
  }
]
const currentSettingItem = ref('base')

</script>
<template>
  <div flex="~" w="50vw">
    <div w="10vw" text="xl">
      <div v-for="item in setting" :key="item.value" hover="bg-neutral-3" p="4px" m="r-20px" b="rd-4px" cursor="pointer"
        :class="{ 'bg-neutral-3': currentSettingItem === item.value }">
        {{ item.label }}</div>
    </div>
    <div flex="1" text="lg">
      <div flex="~ justify-between" m="b-16px">
        <span>上班时间</span>
        <el-time-picker v-model="settingData.base.start" placeholder="" value-format="HH:mm:ss" />
      </div>
      <div flex="~ justify-between" m="b-16px">
        <span>下班时间</span>
        <el-time-picker v-model="settingData.base.end" placeholder="" value-format="HH:mm:ss" />
      </div>
      <div flex="~ justify-between" m="b-16px">
        <div flex="~ items-center">
          <span m="r-4px">是否计入午休时长</span>
          <el-tooltip class="box-item" effect="dark" content="开启后会影响下班进度条的比例" placement="right">
           <div class="i-solar-question-circle-bold-duotone"></div>
          </el-tooltip>
        </div>
        <el-switch v-model="settingData.base.countNoonBreak" active-color="#FF5C90"></el-switch>
      </div>
      <div v-show="settingData.base.countNoonBreak" flex="~ justify-between" m="b-16px">
        <span>午休时长</span>
        <div flex="~ items-center">
          <el-input-number v-model="settingData.base.noonBreak" :min="0" :max="10" :step="0.5"></el-input-number>
          <span m="l-4px">小时</span>
        </div>
      </div>
    </div>
  </div>
</template>