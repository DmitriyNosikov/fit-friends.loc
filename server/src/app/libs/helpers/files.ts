import dayjs from 'dayjs';

export function getCurrentDayTimeDirectory() {
  const year = dayjs().format('YYYY')
  const month = dayjs().format('MM');
  const day = dayjs().format('DD');
  return `${year}/${month}/${day}`;
}

export function getUniqFilenamePrefix() {
  return dayjs().unix() * dayjs().millisecond();
}