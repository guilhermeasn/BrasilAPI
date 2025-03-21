const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const SUNDAY = 0;
const SATURDAY = 6;
const WEEKEND = [SUNDAY, SATURDAY];

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('America/Sao_Paulo');

export const getNow = () => dayjs();

export const formatDate = (date, format = 'DD/MM/YYYY') =>
  dayjs(date).format(format);

export const parseToDate = (value, format = '') => {
  return dayjs(value, format).toDate();
};

export const isValidDate = (date) => dayjs(date).isValid();

export const isWeekend = (date) => {
  return WEEKEND.includes(dayjs(date).get('day'));
};

export const subBusinessDays = (date, days) => {
  const newDate = dayjs(date);
  let count = 0;

  if (isWeekend(date)) {
    if (newDate.get('day') === SATURDAY) {
      count = 1;
    } else {
      count = 2;
    }
  }

  return newDate.subtract(count + days, 'day').toDate();
};
