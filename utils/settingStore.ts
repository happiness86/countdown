import { createGlobalState, useLocalStorage } from "@vueuse/core";
import dayjs from "dayjs";

const CACHE_SETTING_KEY = 'countdownSetting'

export const useSetting = createGlobalState(() => {
  return useLocalStorage(CACHE_SETTING_KEY, {
    base: {
      start: dayjs().format("10:00:00"),
      end: dayjs().format("19:00:00"),
      countNoonBreak: false,
      noonBreak: 1,
    },
  });
});
