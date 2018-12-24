import React from 'react';
import { getMonthFirstDay, thisMonthDates, getDateISO } from '../helpers/calendar';
import { WEEK_DAYS } from '../helpers/calendar';

export default class Month extends React.Component {
  constructor(props) {
    super(props);
    this.renderDay = this.renderDay.bind(this);
    this.renderWeeks = this.renderWeeks.bind(this);
    this.state = {
      from: this.props.from,
      to: this.props.to,
      current: this.props.current,
      naDays: this.props.naDays,
    };
  }
  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {

  }

  renderDay(day, index) {
    const thisDay = new Date(day);
    const isoDate = getDateISO(thisDay);
    const dayNA = this.props.unavailable.indexOf(isoDate) > -1;
    const daySelected = this.props.from == isoDate || this.props.to == isoDate;
    const dayBetween = this.props.from < isoDate && this.props.to > isoDate;
    const dayConflict = this.props.naDays.indexOf(isoDate) > -1;
    if (day[0] === 'indent' || day[0] === 'pad') {
      return (
        <td key={index} id={index} className="day day__blank"></td>
      );
    } else {
      return (
        <td key={isoDate} id={isoDate} className="day">
          <button
          id={isoDate}
          className={`day__button${daySelected || dayBetween ? ' day__button__selected' : ''}${dayNA ? ' day__button__na' : ''}${dayConflict ? ' day__button__conflict' : ''}`}
          disabled={daySelected || dayNA} onClick={(e) => { this.props.handleSetDay(e.target.id) }}
          >
            {thisDay.getDate()}
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