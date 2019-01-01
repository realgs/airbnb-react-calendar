export const ONE_DAY = 1000 * 60 * 60 * 24;
export const round2Decimals = (num) => {
  return Math.round(num * 100 + Number.EPSILON) / 100;
};

export const THIS_YEAR = +(new Date().getFullYear());
export const THIS_MONTH = +(new Date().getMonth());

export const WEEK_DAYS = [
  "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"
];

export const MONTHS = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const zeroPad = (value, length) => {
  return `${value}`.padStart(length, '0');
}
// 1 - Sunday, ..., 7 - Saturday
export const getMonthFirstDay = (month = THIS_MONTH, year = THIS_YEAR) => {
  return +(new Date(`${year}-${zeroPad(month + 1, 2)}-01`).getDay());
}

export const NO_DAYS_MONTH = getMonthDays();

export function getMonthDays(month = THIS_MONTH, year = THIS_YEAR) {
  return 32 - new Date(year, month, 32).getDate();
}

export const thisMonthDates = (month = THIS_MONTH, year = THIS_YEAR) => {
  const daysToIndent = getMonthFirstDay(month, year);
  let indents = [...new Array(daysToIndent)].map((n, index) => {
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

// (bool) Checks if a value is a date
export const isDate = date => {
  const isDate = Object.prototype.toString.call(date) === '[object Date]';
  const isValidDate = date && !Number.isNaN(date.valueOf());

  return isDate && isValidDate;
}

// (bool) Checks if two date values are of the same month and year
export const isSameMonth = (date, basedate = new Date()) => {

  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateMonth = +(basedate.getMonth());
  const basedateYear = basedate.getFullYear();

  const dateMonth = +(date.getMonth());
  const dateYear = date.getFullYear();

  return (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);

}

// (bool) Checks if two date values are the same day
export const isSameDay = (date, basedate = new Date()) => {

  if (!(isDate(date) && isDate(basedate))) return false;

  const basedateDate = basedate.getDate();
  const basedateMonth = +(basedate.getMonth());
  const basedateYear = basedate.getFullYear();

  const dateDate = date.getDate();
  const dateMonth = +(date.getMonth());
  const dateYear = date.getFullYear();

  return (+basedateDate === +dateDate) && (+basedateMonth === +dateMonth) && (+basedateYear === +dateYear);

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
// Calendar builder for a month in the specified year
// Returns an array of the calendar dates.
// Each calendar date is represented as an array => [YYYY, MM, DD]

// export default (month = THIS_MONTH, year = THIS_YEAR) => {

//   // Get number of days in the month and the month's first day

//   const monthDays = getMonthDays(month, year);
//   const monthFirstDay = getMonthFirstDay(month, year);

//   // Get number of days to be displayed from previous and next months
//   // These ensure a total of 42 days (6 weeks) displayed on the calendar

//   // Get the previous and next months and years

//   const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(month, year);
//   const { month: nextMonth, year: nextMonthYear } = getNextMonth(month, year);


//   // Builds dates to be displayed from current month

//   const thisMonthDates = [...new Array(monthDays)].map((n, index) => {
//     const day = index + 1;
//     return [year, zeroPad(month, 2), zeroPad(day, 2)];
//   });

//   // Combines all dates from previous, current and next months
//   return [...prevMonthDates, ...thisMonthDates];

// }
