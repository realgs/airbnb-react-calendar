import React from 'react';
import { thisMonthDates, getDateISO } from '../helpers/calendar';
import { WEEK_DAYS } from '../helpers/calendar';

export default class Month extends React.Component {
  constructor(props) {
    super(props);
    this.renderDay = this.renderDay.bind(this);
    this.renderWeeks = this.renderWeeks.bind(this);
  }
  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {

  }

  renderDay(day, index) {
    const currentDate = new Date(day);
    const today = getDateISO(currentDate);
    const dayNA = this.props.unavailable.indexOf(today) > -1;
    const daySelected = this.props.from == today || this.props.to == today;
    const dayBetween = this.props.from < today && this.props.to > today;
    const dayConflict = this.props.naDays.indexOf(today) > -1;
    if (day[0] === 'indent' || day[0] === 'pad') {
      return (
        <td key={index} id={index} className="day day__blank"></td>
      );
    } else {
      return (
        <td key={today} id={today} className="day">
          <button
          id={today}
          className={`day__button${daySelected || dayBetween ? ' day__button__selected' : ''}${dayNA ? ' day__button__na' : ''}${dayConflict ? ' day__button__conflict' : ''}`}
            disabled={daySelected || dayNA} onClick={(e) => { this.props.handleSetDay(e.target.id) }}
          >
            {currentDate.getDate()}
          </button>
        </td>
      );
    }
  }
  renderWeeks(week, weekIndex) {
    return (
      <tr key={weekIndex} id={weekIndex}>
        {week.map(this.renderDay)}
      </tr>
    );
  }
  renderWeekDays(name, index) {
    return (
      <th key={index} className="month__weekday">
        {name}
      </th>
    );
  }

  render() {
    return (
      <div className="month">
        <table className="month__table">
          <thead>
            <tr>
              {WEEK_DAYS.map(this.renderWeekDays)}
            </tr>
          </thead>
          <tbody>
            {thisMonthDates(this.props.current.month, this.props.current.year).map(this.renderWeeks)}
          </tbody>
        </table>
      </div>
    );
  }
}