export const ONE_DAY = 1000 * 60 * 60 * 24;
export const THIS_YEAR = +(new Date().getFullYear());
export const THIS_MONTH = +(new Date().getMonth());
export const WEEK_DAYS = [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ];
export const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

export const round2Decimals = (num) => {
  return Math.round(num * 100 + Number.EPSILON) / 100;
};

export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, '0');
}

export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +(new Date(`${year}-${zeroPad(month + 1, 2)}-01`).getDay());
}

export const NO_DAYS_MONTH = getMonthDays();

export function getMonthDays(month = THIS_MONTH, year = THIS_YEAR) {
  return 32 - new Date(year, month, 32).getDate();
}

export const thisMonthDates = (month = THIS_MONTH, year = THIS_YEAR) => {
  const daysToIndent = getMonthFirstDay(month, year);
  const indents = [...new Array(daysToIndent)].map((n, index) => {
    const day = index + 1;
    return ['indent', zeroPad(day, 2)];
  });
  const daysOfMonth = [...new Array(getMonthDays(month, year))].map((n, index) => {
    const day = index + 1;
    return [year, zeroPad(month + 1, 2), zeroPad(day, 2)];
  });
  const daysToPad = 7 - (indents.length + daysOfMonth.length) % 7;
  const pads = [...new Array(daysToPad)].map((n, index) => {
    const day = index + 1;
    return ['pad', zeroPad(day, 2)];
  });
  const monthDates = [...indents, ...daysOfMonth, ...pads];
  let monthDatesDivided = [];
  for (var i = 0; i < monthDates.length; i += 7)
    monthDatesDivided.push(monthDates.slice(i, i + 7));
  return monthDatesDivided;
};

export const isDate = date => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
}

export const getDateISO = (date = new Date) => {

  if (!isDate(date)) return null;

  return [
    date.getFullYear(),
    zeroPad(+date.getMonth() + 1, 2),
    zeroPad(+date.getDate(), 2)
  ].join('-');
}

export const getPreviousMonth = (prevMonth, prevYear) => {
  const newMonth = (prevMonth > 0) ? prevMonth - 1 : 11;
  const newYear = (prevMonth > 0) ? prevYear : prevYear - 1;

  return { month: newMonth, year: newYear };
}

export const getNextMonth = (month, year) => {
  const nextMonth = (month < 11) ? month + 1 : 0;
  const nextMonthYear = (month < 11) ? year : year + 1;

  return { month: nextMonth, year: nextMonthYear };
}