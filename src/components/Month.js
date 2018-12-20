import React from 'react';
import calendar, { getMonthFirstDay, thisMonthDates, getDateISO } from '../helpers/calendar';
import { WEEK_DAYS } from '../helpers/calendar';

export default class Month extends React.Component {
  constructor(props) {
    super(props);
    this.renderDay = this.renderDay.bind(this);
    this.renderWeeks = this.renderWeeks.bind(this);
    this.state = {
      from: null,
      to: null,
      last: null,
      isSecondPick: false,
      current: this.props.current,
    };
  }
  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.to && this.state.from) {
      let fromDate = new Date(this.state.from);
      let toDate = new Date(this.state.to);
      if (fromDate > toDate) {
        console.log(`-----Switched days from: ${fromDate.toLocaleDateString()} --- ${toDate.toLocaleDateString()}`);
        console.log(`To: ${toDate.toLocaleDateString()} --- ${fromDate.toLocaleDateString()}`);
        this.setState({
          from: prevState.to ? prevState.to : this.state.to,
          to: prevState.from ? prevState.from : this.state.from
        });
        this.setState({ isSecondPick: !prevState.isSecondPick });
        if (!prevState.to) {
          this.setState({ isSecondPick: prevState.isSecondPick });
        }
      }
    }
  }
  handleSetDay(day) {
    //console.log(`The day: ${day} has been picked!`);
    console.log(this.props.unavailable);
    this.state.isSecondPick ? this.setState({ to: day }) : this.setState({ from: day });
    this.setState({ isSecondPick: !this.state.isSecondPick });
    this.props.toggleIsSecondPick(day);
  }

  renderDay(day, index) {
    const thisDay = new Date(day);
    const isoDate = getDateISO(thisDay);
    const dayNA = this.props.unavailable.indexOf(isoDate) > -1;
    const daySelected = this.state.from == isoDate || this.state.to == isoDate || this.state.from < isoDate && this.state.to > isoDate;
    //console.log(isoDate);
    if (day[0] === 'indent' || day[0] === 'pad') {
      return (
        <td key={index} id={index} className="day day__blank"></td>
      );
    } else {
      return (
        <td key={isoDate} id={isoDate} className="day">
          <button
          id={isoDate}
          className={`day__button${daySelected ? ' day__button__selected' : ''}${dayNA ? ' day__button__na' : ''}`}
          disabled={daySelected || dayNA} onClick={(e) => { this.handleSetDay(e.target.id) }}
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