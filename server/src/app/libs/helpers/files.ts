import dayjs from 'dayjs';

export function getCurrentDayTimeDirectory() {
  const [year, month, day] = dayjs().format('YYYY MM DD').split(' ');
  return `${year}/${month}/${day}`;
}

export function getUniqFilenamePrefix() {
  return dayjs().unix() * dayjs().millisecond();
}