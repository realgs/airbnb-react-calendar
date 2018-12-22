import React from 'react';
import calendar, { THIS_YEAR, THIS_MONTH, MONTHS, getPreviousMonth, getNextMonth } from '../helpers/calendar';
import Month from './Month';
import SubscriptInfo from './SubscriptInfo';
import { unavailableDates } from '../data/unavailable';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.goMonthBack = this.goMonthBack.bind(this);
    this.goMonthForward = this.goMonthForward.bind(this);
    this.togglesetSecondDate = this.togglesetSecondDate.bind(this);
    this.chooseCheckIn = this.chooseCheckIn.bind(this);
    this.chooseCheckOut = this.chooseCheckOut.bind(this);
    this.toggleReset = this.toggleReset.bind(this);
    this.togglePickerVisibility = this.togglePickerVisibility.bind(this);
    this.state = {
      today: new Date(),
      current: {
        month: THIS_MONTH,
        year: THIS_YEAR,
      },
      from: null,
      to: null,
      setSecondDate: false,
      unavailable: [],
      hidePicker: true,
      reset: true,
    };
  }
  componentDidMount() {
    const today = new Date().setHours(0, 0, 0, 0);
    this.setState({ today });
    try {
      if (unavailableDates) {
        //console.log('Unavailable dates loaded.');
      }
    } catch (error) {
      console.log(`Error loading unavailable dates: ${e}`);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.to && this.state.from) {
      let fromDate = new Date(this.state.from);
      let toDate = new Date(this.state.to);
      if (fromDate > toDate) {
        //console.log(`-----Switched days from: ${fromDate} --- ${toDate}`);
        //console.log(`To: ${toDate} --- ${fromDate}`);
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
  goMonthBack() {
    const newCurrent = getPreviousMonth(this.state.current.month, this.state.current.year);
    this.setState({ current: { month: newCurrent.month, year: newCurrent.year } });
  }
  goMonthForward() {
    const newCurrent = getNextMonth(this.state.current.month, this.state.current.year);
    this.setState({ current: { month: newCurrent.month, year: newCurrent.year } });
  }
  togglesetSecondDate(day) {
    this.state.setSecondDate ? this.setState({ to: day }) : this.setState({ from: day });
    this.setState({
      setSecondDate: !this.state.setSecondDate
    });
  }
  toggleReset() {
    this.setState({ reset: !this.state.reset });
  }
  togglePickerVisibility() {
    this.setState({ hidePicker: !this.state.hidePicker });
  }
  chooseCheckIn() {
    this.togglePickerVisibility();

  }
  chooseCheckOut() {
    this.togglePickerVisibility();
  }
  render() {
    return (
      <div className="wrapper__calendar">
        <div className="calendar">
          <div className="calendar__header">
            <span>Dates</span>
            <div className="calendar__dates">
              <button id="checkin" className="calendar__dates__checkin" onClick={this.chooseCheckIn}>
                Check In
              </button>
              <button id="checkout" className="calendar__dates__checkout" onClick={this.chooseCheckOut}>
                Check Out
              </button>
            </div>
          </div>
          <div className={`calendar__picker${this.state.hidePicker ? ' hidden' : ''}`}>
            <div className="calendar__nav">
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
              setSecondDate={this.state.setSecondDate}
              togglesetSecondDate={this.togglesetSecondDate}
              unavailable={unavailableDates}
              minStay={this.props.minStay}
              togglePickerVisibility={this.state.togglePickerVisibility}
              reset={this.state.reset}
              toggleReset={this.toggleReset}
            />
            <SubscriptInfo lastupdate={23} />
          </div>
        </div>
      </div>
    );
  }
}
