import React from 'react';
import calendar, { getMonthFirstDay, thisMonthDates, getDateISO } from '../helpers/calendar';
import { WEEK_DAYS } from '../helpers/calendar';

export default class Month extends React.Component {
  constructor(props) {
    super(props);
    this.renderDay = this.renderDay.bind(this);
    this.renderWeeks = this.renderWeeks.bind(this);
    this.canSet = this.canSet.bind(this);
    this.state = {
      from: null,
      to: null,
      lastModified: null,
      setSecondDate: false,
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
        this.setState({ setSecondDate: !prevState.setSecondDate });
        if (!prevState.to) {
          this.setState({ setSecondDate: prevState.setSecondDate });
        }
      }
    }
  }
  handleSetDay(day) {
    if (this.canSet(day)) {
      this.state.setSecondDate ? this.setState({ to: day }) : this.setState({ from: day });
      this.setState({ setSecondDate: !this.state.setSecondDate });
      this.setState({ lastModified: day });
      this.props.togglesetSecondDate(day);
    } else {
      console.log('Sorry these days are unavailable.')
    }
  }
  canSet(day) {
    const minMax = [this.state.lastModified, day].sort();
    const naDays = this.props.unavailable.filter((d) => {
      return  d > minMax[0] && d < minMax[1];
    });
    return !Array.isArray(naDays) || !naDays.length;
  }

  renderDay(day, index) {
    const thisDay = new Date(day);
    const isoDate = getDateISO(thisDay);
    const dayNA = this.props.unavailable.indexOf(isoDate) > -1;
    const daySelected = this.state.from == isoDate || this.state.to == isoDate;
    const dayBetween = this.state.from < isoDate && this.state.to > isoDate;
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
          className={`day__button${daySelected || dayBetween ? ' day__button__selected' : ''}${dayNA ? ' day__button__na' : ''}`}
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