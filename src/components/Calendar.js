import React from 'react';
import calendar, { THIS_YEAR, THIS_MONTH, MONTHS, getPreviousMonth, getNextMonth } from '../helpers/calendar';
import Month from './Month';
import SubscriptInfo from './SubscriptInfo';

export default class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.goMonthBack = this.goMonthBack.bind(this);
    this.goMonthForward = this.goMonthForward.bind(this);
    this.toggleIsSecondPick = this.toggleIsSecondPick.bind(this);
    this.state = {
      today: new Date(),
      current: {
        month: THIS_MONTH,
        year: THIS_YEAR,
      },
      from: null,
      to: null,
      isSecondPick: false,
    };
  }
  componentDidMount() {
    const today = new Date().setHours(0,0,0,0);
    this.setState({ today });
  }
  componentDidUpdate(prevProps, prevState) {
    // if (this.state.to && this.state.from) {
    //   let fromDate = new Date(this.state.from);
    //   let toDate = new Date(this.state.to);
    //   // console.log(`From: ${fromDate}`);
    //   // console.log(`To: ${toDate}`);
    //   if (fromDate > toDate) {
    //     this.setState({
    //       from: prevState.to,
    //       to: prevState.from
    //     })
    //   }
    // }
  }
  goMonthBack() {
    const newCurrent = getPreviousMonth(this.state.current.month, this.state.current.year);
    this.setState({ current: { month: newCurrent.month, year: newCurrent.year} });
  }
  goMonthForward() {
    const newCurrent = getNextMonth(this.state.current.month, this.state.current.year);
    this.setState({ current: { month: newCurrent.month, year: newCurrent.year } });
  }
  toggleIsSecondPick(day) {
    this.state.isSecondPick ? this.setState({ to: day }) : this.setState({ from: day });
    this.setState({
      isSecondPick: !this.state.isSecondPick
    });
  }
  swapDates() {

  }
  render() {
    return (
      <div className="calendar">
        <div className="calendar__header">
          <button className="calendar__arrow__button" onClick={this.goMonthBack}>
            <img src="./images/left-arrow.png" alt="previous month" className="calendar__arrow__left"></img>
          </button>
          <div>{`${MONTHS[this.state.current.month]} ${this.state.current.year}`}</div>
          <button className="calendar__arrow__button" onClick={this.goMonthForward}>
            <img src="./images/right-arrow.png" alt="next month" className="calendar__arrow__right"></img>
          </button>
        </div>
        <Month
          current={this.state.current}
          from={this.state.from}
          to={this.state.to}
          isSecondPick={this.state.isSecondPick}
          toggleIsSecondPick={this.toggleIsSecondPick}
        />
        <SubscriptInfo lastupdate={23} />
      </div>
    );
  }
}
