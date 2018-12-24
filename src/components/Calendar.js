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
    this.handleSetDay = this.handleSetDay.bind(this);
    this.state = {
      today: new Date(),
      current: {
        month: THIS_MONTH,
        year: THIS_YEAR,
      },
      from: null,
      to: null,
      lastModified: null,
      setSecondDate: false,
      unavailable: [],
      hidePicker: true,
      reset: true,
      naDays: [],
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
      this.toggleReset();
    } else {
      if (this.canSet(day)) {
        this.setState({ to: day, lastModified: day, reset: true });
        const fromDate = new Date(this.state.from);
        const toDate = new Date(day);
        const oneDay = 1000 * 60 * 60 * 24;
        this.props.setStayLength(Math.round(Math.abs((fromDate.getTime() - toDate.getTime()) / (oneDay))));
        this.toggleReset();
        this.togglePickerVisibility();
      } else {
        console.log('Sorry these days are unavailable.')
      }
    }
  }
  canSet(day) {
    const minMax = [this.state.lastModified, day].sort();
    const naDays = unavailableDates.filter((d) => {
      return d > minMax[0] && d < minMax[1];
    });
    this.setState({ naDays });
    return !Array.isArray(naDays) || !naDays.length;
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
        <div className="calendar">
          <div className="calendar__header">
            <span>Dates</span>
            <div className="calendar__dates">
              <button id="checkin" className="calendar__dates__checkin" onClick={this.chooseCheckIn}>
                Check In
              </button>
              <img src="./images/right-arrow.png" alt="date from - to separator" className="calendar__dates__separator"></img>
              <button id="checkout" className="calendar__dates__checkout" onClick={this.chooseCheckOut}>
                Check Out
              </button>
            </div>
          </div>
          <div className={`calendar__picker${this.state.hidePicker ? ' hidden' : ''}`}>
          <svg role="presentation" focusable="false" className="calendar__bubble">
            <path className="_whdw9f" d="M0,10 20,10 10,0z"></path>
            <path className="_c3dsty" d="M0,10 10,0 20,10"></path>
          </svg>
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
              togglePickerVisibility={this.togglePickerVisibility}
              reset={this.state.reset}
              toggleReset={this.toggleReset}
              naDays={this.state.naDays}
              handleSetDay={this.handleSetDay}
            />
            <SubscriptInfo lastupdate={23} />
          </div>
        </div>
    );
  }
}
