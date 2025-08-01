import dayjs from 'dayjs';
import 'dayjs/locale/en'; // 引入本地化配置
import duration from 'dayjs/plugin/duration';
import toObject from 'dayjs/plugin/toObject';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(toObject);
dayjs.extend(duration);
type options = { value: string; disabled: boolean }[];
export function generateTimeOptions(config: {
  format: string;
  disabledHours?: () => number[];
  disabledMinutes?: (selectedHour?: number) => number[];
  disabledSeconds?: (
    selectedHour?: number,
    selectedMinute?: number
  ) => number[];
  hideDisabledOptions?: boolean;
  step?: {
    hour?: number;
    minute?: number;
    second?: number;
  };
  selectedHour?: string;
  selectedMinute?: string;
}) {
  const {
    format,
    disabledHours,
    disabledMinutes,
    disabledSeconds,
    hideDisabledOptions,
    step,
    selectedHour,
    selectedMinute,
  } = config;
  const hours: options = [];
  const minutes: options = [];
  const seconds: options = [];
  const meridiems: options = [];
  const is24Hour = format.includes('H');
  const hasHours = format.includes('H') || format.includes('h');
  const hasMinutes = format.includes('m');
  const hasSeconds = format.includes('s');
  const hourFormat = is24Hour ? 'HH' : 'hh';
  const minuteFormat = format.includes('mm') ? 'mm' : 'm';
  const secondFormat = format.includes('ss') ? 'ss' : 's';

  const stepHour = step?.hour ?? 1;
  const stepMinute = step?.minute ?? 1;
  const stepSecond = step?.second ?? 1;

  if (hasHours) {
    const disabledHourSet = new Set(disabledHours?.() ?? []);
    const start = is24Hour ? 0 : 0;
    const end = is24Hour ? 24 : 12;
    // // 12小时制从12到11，
    for (let i = start; i < end; i += stepHour) {
      let t = i;
      if (!is24Hour && i === 0) {
        t = 12;
      }
      const hour = dayjs().hour(t).format(hourFormat);
      const isDisabled = disabledHourSet.has(t);
      if (!isDisabled || !hideDisabledOptions) {
        hours.push({ value: hour, disabled: isDisabled });
      }
    }
  }

  if (hasMinutes) {
    const nowHour = parseInt(selectedHour ?? '0', 10);
    const disabledMinuteSet = new Set(disabledMinutes?.(nowHour) ?? []);
    for (let i = 0; i < 60; i += stepMinute) {
      const minute = dayjs().minute(i).format(minuteFormat);
      const isDisabled = disabledMinuteSet.has(i);
      if (!isDisabled || !hideDisabledOptions) {
        minutes.push({ value: minute, disabled: isDisabled });
      }
    }
  }

  if (hasSeconds) {
    const nowHour = parseInt(selectedHour ?? '0', 10);
    const nowMinute = parseInt(selectedMinute ?? '0', 10);
    const disabledSecondSet = new Set(
      disabledSeconds?.(nowHour, nowMinute) ?? []
    );
    for (let i = 0; i < 60; i += stepSecond) {
      const second = dayjs().second(i).format(secondFormat);
      const isDisabled = disabledSecondSet.has(i);
      if (!isDisabled || !hideDisabledOptions) {
        seconds.push({ value: second, disabled: isDisabled });
      }
    }
  }

  if (!is24Hour && hasHours) {
    if (format.includes('a')) {
      meridiems.push(
        { value: 'am', disabled: false },
        { value: 'pm', disabled: false }
      );
    } else if (format.includes('A')) {
      meridiems.push(
        { value: 'AM', disabled: false },
        { value: 'PM', disabled: false }
      );
    }
  }

  return {
    hours,
    minutes,
    seconds,
    meridiems,
  };
}
export function parseTimeStrByFormat(
  timeStr: string,
  format: string
): {
  hours: string;
  minutes: string;
  seconds: string;
  meridiems: string | undefined;
} {
  const parsedTime = dayjs(timeStr, format, true);

  const is24Hour = format.includes('H');
  const hourFormat = is24Hour ? 'HH' : 'hh';
  const minuteFormat = format.includes('mm') ? 'mm' : 'm';
  const secondFormat = format.includes('ss') ? 'ss' : 's';

  const hours = parsedTime.format(hourFormat);
  const minutes = parsedTime.format(minuteFormat);
  const seconds = parsedTime.format(secondFormat);
  let meridiems;
  if (!is24Hour) {
    meridiems = format.includes('a')
      ? parsedTime.format('a')
      : parsedTime.format('A');
  }
  return {
    hours,
    minutes,
    seconds,
    meridiems,
  };
}

export function timeObjToStr(
  timeObj: {
    hours?: string;
    minutes?: string;
    seconds?: string;
    meridiems?: string | undefined;
  },
  format: string
): string {
  let hour = timeObj.hours ? parseInt(timeObj.hours, 10) : undefined;
  let minute = timeObj.minutes ? parseInt(timeObj.minutes, 10) : undefined;
  let second = timeObj.seconds ? parseInt(timeObj.seconds, 10) : undefined;

  if (hour !== undefined) {
    const meridiem = timeObj.meridiems?.toUpperCase();
    if (meridiem === 'PM' && hour !== 12) {
      hour += 12;
    } else if (meridiem === 'AM' && hour === 12) {
      hour = 0;
    }
  }

  const time = dayjs()
    .hour(hour ?? 0)
    .minute(minute ?? 0)
    .second(second ?? 0);

  // 检查是否有任何字段被设置
  if (
    (hour === undefined && minute === undefined && second === undefined) ||
    !time.isValid()
  ) {
    return '';
  }

  return time.format(format);
}

// 时间是否合法
export const isValidTimeRange = (
  beginDate: string,
  endDate: string,
  format: string
): boolean => {
  const begin = dayjs(beginDate, format).locale('en', { weekStart: 1 });
  const end = dayjs(endDate, format).locale('en', { weekStart: 1 });
  return begin.isBefore(end);
};

//生成月份日历数组
export interface CalendarCellData {
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
  fullDate: string;
}
export function generateMonthCalendar(year: number, month: number) {
  // 创建当前月份的第一天
  const firstDayOfMonth = dayjs(`${year}-${month}-01`);
  // 获取当前月份的第一天是星期几 (0-6, 0表示周日)
  const firstDayOfWeek = firstDayOfMonth.day();
  // 获取上个月需要显示的天数
  const daysFromPrevMonth = firstDayOfWeek;
  // 计算日历总天数 (6周 x 7天 = 42天)
  const totalCalendarDays = 42;
  // 生成日历数组
  const calendar: CalendarCellData[][] = [];
  // 当前这一行的数据
  const row: CalendarCellData[] = [];
  // 遍历
  for (let i = 0; i < totalCalendarDays; i++) {
    // 计算当前日期
    const dayOffset = i - daysFromPrevMonth;
    const date = firstDayOfMonth.add(dayOffset, 'day');
    // 判断是否属于当前月份
    const isCurrentMonth = date.month() + 1 === month;
    // 添加到当前行
    row.push({
      day: date.date(),
      month: date.month(),
      year: date.year(),
      fullDate: date.format('YYYY/MM/DD'),
      isCurrentMonth,
    });
    // 每7天换一行
    if (row.length === 7) {
      calendar.push([...row]);
      row.splice(0);
    }
  }
  return calendar;
}

export const formatSeconds = (
  time: number,
  format: string,
  type: dayjs.UnitType = 'milliseconds'
) => {
  return dayjs.duration(time, type as any).format(format);
};

export const formatDate = (value: string | number | Date, format: string) => {
  return dayjs(value).format(format);
};
