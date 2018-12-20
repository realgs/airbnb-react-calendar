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
        console.log(`-----Switched from: ${fromDate}`);
        console.log(`To: ${toDate}`);
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
  handleSetDay(day){
    console.log(`The day: ${day} has been picked!`);
    //this.setState({ from: day});
    this.state.isSecondPick ? this.setState({ to: day }) : this.setState({ from: day});
    this.setState({ isSecondPick: !this.state.isSecondPick });
    //this.props.toggleIsSecondPick(day);
  }

  renderDay(day, index) {
    const thisDay = new Date(day);
    const isoDate = getDateISO(thisDay);
    if (day[0] === 'indent' || day[0] === 'pad') {
      return (
        <td key={index} id={index} className="day day__blank"></td>
      );
    } else {
      return (
        <td key={getDateISO(thisDay)} id={getDateISO(thisDay)} className="day">
          <button id={getDateISO(thisDay)} className={`day__button${this.state.from == isoDate || this.state.to == isoDate ? ' day__button__selected' : ''}`} disabled={this.state.from == isoDate || this.state.to == isoDate} onClick={(e) => { this.handleSetDay(e.target.id)}}>
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