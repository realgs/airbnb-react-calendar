import React from 'react';
import { getMonthFirstDay, thisMonthDates, getDateISO } from '../helpers/calendar';
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
      reset: this.props.reset,
      current: this.props.current,
      naDays: [],
    };
  }
  componentDidMount() {
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.from) {
      document.getElementById("checkin").innerHTML = this.state.from;
      if (this.state.to) {
        document.getElementById("checkout").innerHTML = this.state.to;
        let fromDate = new Date(this.state.from);
        let toDate = new Date(this.state.to);
        if (fromDate > toDate) {
          //console.log(`-----Switched days from: ${fromDate.toLocaleDateString()} --- ${toDate.toLocaleDateString()}`);
          //console.log(`To: ${toDate.toLocaleDateString()} --- ${fromDate.toLocaleDateString()}`);
          this.setState({
            from: prevState.to ? prevState.to : this.state.to,
            to: prevState.from ? prevState.from : this.state.from
          });
        }
      }
    }
  }
  handleSetDay(day) {

    if (this.state.reset) {
      this.setState({
        from: day,
        lastModified: day,
        to: null,
        reset: false,
      });
      this.props.toggleReset();
    } else {
      if (this.canSet(day)) {
        this.setState({ to: day, lastModified: day, reset: true });
        this.props.toggleReset();
      } else {
        console.log('Sorry these days are unavailable.')
      }
    }

  }
  canSet(day) {
    const minMax = [this.state.lastModified, day].sort();
    const naDays = this.props.unavailable.filter((d) => {
      return  d > minMax[0] && d < minMax[1];
    });
    this.setState({ naDays });
    return !Array.isArray(naDays) || !naDays.length;
  }

  renderDay(day, index) {
    const thisDay = new Date(day);
    const isoDate = getDateISO(thisDay);
    const dayNA = this.props.unavailable.indexOf(isoDate) > -1;
    const daySelected = this.state.from == isoDate || this.state.to == isoDate;
    const dayBetween = this.state.from < isoDate && this.state.to > isoDate;
    const dayConflict = this.state.naDays.indexOf(isoDate) > -1;
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