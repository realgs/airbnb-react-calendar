import React from 'react';
import { thisMonthDates, getDateISO } from '../helpers/calendar';
import { WEEK_DAYS } from '../helpers/calendar';

const Month = ({ current, from, to, unavailable, naDays, handleSetDay, setSecondDate, handleSetCandidate, handleDeleteCandidate, candidate }) => {

  const renderDay = (day, index) => {
    const currentDate = new Date(day);
    const currentDay = getDateISO(currentDate);
    const dayNA = unavailable && unavailable.indexOf(currentDay) > -1 || currentDay < getDateISO(new Date());
    const firstSelected = from == currentDay && !setSecondDate || to == currentDay && setSecondDate;
    const secondSelected = from == currentDay && setSecondDate || to == currentDay && !setSecondDate;
    const daySelected = firstSelected || secondSelected;
    const dayBetween = from < currentDay && to > currentDay;
    const dayConflict = naDays && naDays.indexOf(currentDay) > -1;
    const isCandidate = currentDay == candidate;

    if (day[0] === 'indent' || day[0] === 'pad') {
      return (
        <td key={index} id={index} className="day day__blank"></td>
      );
    } else {
      return (
        <td key={currentDay} id={currentDay} className={`day${dayBetween ? ' day__td__between' : ''}${daySelected ? ' day__td__selected' : ''}`}>
          <button
            id={currentDay}
            className={`day__button${daySelected ? ' day__button__selected' : ''}${dayNA ? ' day__button__na' : ''}${dayConflict ? ' day__button__conflict' : ''}${dayBetween ? ' day__button__between' : ''}${isCandidate ? ' day__button__candidate' : ''}`}
            disabled={secondSelected || dayNA}
            onClick={(e) => { handleSetDay(e.target.id) }}
            onMouseOver={(e) => { handleSetCandidate(e.target.id) }}
            onMouseOut={(e) => { handleDeleteCandidate(e.target.id) }}
          >
            {currentDate.getDate()}
          </button>
        </td>
      );
    }
  }

  const renderWeeks = (week, weekIndex) => {
    return (
      <tr key={weekIndex} id={weekIndex}>
        {week.map(renderDay)}
      </tr>
    );
  }

  const renderWeekDays = (name, index) => {
    return (
      <th key={index} className="month__weekday">
        {name}
      </th>
    );
  }

  return (
    <div className="month">
      <table className="month__table">
        <thead>
          <tr>
            {WEEK_DAYS.map(renderWeekDays)}
          </tr>
        </thead>
        <tbody>
          {thisMonthDates(current.month, current.year).map(renderWeeks)}
        </tbody>
      </table>
    </div>
  );
}

export default Month;