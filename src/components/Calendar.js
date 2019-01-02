import React from 'react';
import { ONE_DAY, THIS_YEAR, THIS_MONTH, MONTHS, getPreviousMonth, getNextMonth } from '../helpers/calendar';
import Month from './Month';
import SubscriptInfo from './SubscriptInfo';
import { unavailableDates } from '../data/unavailable';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.goMonthBack = this.goMonthBack.bind(this);
    this.goMonthForward = this.goMonthForward.bind(this);
    this.toggleSetSecondDate = this.toggleSetSecondDate.bind(this);
    this.chooseCheckIn = this.chooseCheckIn.bind(this);
    this.chooseCheckOut = this.chooseCheckOut.bind(this);
    this.hidePicker = this.hidePicker.bind(this);
    this.handleSetDay = this.handleSetDay.bind(this);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.clearDates = this.clearDates.bind(this);
    this.handleSetCandidate = this.handleSetCandidate.bind(this);
    this.handleDeleteCandidate = this.handleDeleteCandidate.bind(this);
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
      naDays: [],
      candidate: null,
    };
  }

  componentDidMount() {
    const today = new Date().setHours(0, 0, 0, 0);
    this.setState({ today });
    try {
      if (unavailableDates) {
      }
    } catch (error) {
      console.log(`Error loading unavailable dates: ${e}`);
    }
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevState) {
    this.setCheckin(this.state.from ? this.state.from : 'Check In');
    this.setCheckout(this.state.to ? this.state.to : 'Check Out');
    if (this.state.from) {
      if (this.state.to) {
        if (this.state.from > this.state.to) {
          this.setCheckin(this.state.to);
          this.setCheckout(this.state.from);
          this.updateStayLength(this.state.to, this.state.from);
          this.setState({
            from: prevState.to ? prevState.to : this.state.to,
            to: prevState.from ? prevState.from : this.state.from
          });
        }
      } else {
        if (this.props.dateMissing) {
          this.showPicker();
          this.props.dateNotMissing();
        }
      }
    } else {
      if (this.props.dateMissing) {
        this.showPicker();
        this.props.dateNotMissing();
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      !this.state.hidePicker && this.hidePicker();
    }
  }

  handleSetDay(day) {
    if (this.state.setSecondDate && this.canSet(day)) {
      this.setCheckout(day);
      this.setState({
        to: day,
        lastModified: day,
        candidate: null,
      });
      this.state.from && this.updateStayLength(this.state.from, day);
      this.toggleSetSecondDate();
      this.state.from && this.hidePicker();
    } else if (this.canSet(day)) {
      this.state.to && day < this.state.to ? this.updateStayLength(day, this.state.to) : this.updateStayLength(day, day);
      //this.state.to && day > this.state.to && this.updateStayLength(day, day);
      this.setState({
        from: day,
        to: day < this.state.to ? this.state.to : null,
        lastModified: day,
        setSecondDate: true,
      });
    } else {
      this.clearDates();
      this.setState({
        from: day,
        lastModified: day,
        setSecondDate: true,
      });
    }
  }

  handleSetCandidate(day) {
    day && this.setState({ candidate: day });
  }

  handleDeleteCandidate(day) {
    this.setState({ candidate: null });
  }

  canSet(day) {
    const dates = [this.state.lastModified, day].sort();
    const naDays = unavailableDates.filter((d) => {
      return d > dates[0] && d < dates[1];
    });
    this.setState({ naDays });
    return !Array.isArray(naDays) || !naDays.length;
  }

  updateStayLength(from, to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    this.props.setStayLength(Math.round(Math.abs((fromDate.getTime() - toDate.getTime()) / ONE_DAY)));
  }

  goMonthBack() {
    const newCurrent = getPreviousMonth(this.state.current.month, this.state.current.year);
    this.setState({ current: { month: newCurrent.month, year: newCurrent.year } });
  }

  goMonthForward() {
    const newCurrent = getNextMonth(this.state.current.month, this.state.current.year);
    this.setState({ current: { month: newCurrent.month, year: newCurrent.year } });
  }

  toggleSetSecondDate(day) {
    this.setState({
      setSecondDate: !this.state.setSecondDate
    });
  }

  showPicker() {
    this.setState({ hidePicker: false });
  }

  hidePicker() {
    this.setState({ hidePicker: true });
  }

  clearDates() {
    this.setState({
      from: null,
      to: null,
      lastModified: null,
      setSecondDate: false,
    });
    this.props.setStayLength(0);
  }

  chooseCheckIn() {
    this.showPicker();
    this.setState({
      setSecondDate: false,
    });
    this.setCheckin('Check In');
  }

  chooseCheckOut() {
    this.showPicker();
    this.setState({
      setSecondDate: true,
    });
    this.setCheckout('Check Out');
  }

  setCheckin(value) {
    const elem = document.getElementById("checkin");
    if (elem) {
      elem.innerHTML = value;
    }
  }

  setCheckout(value) {
    const elem = document.getElementById("checkout");
    if (elem) {
      elem.innerHTML = value;
    }
  }

  render() {
    return (
      <div className="calendar" ref={this.setWrapperRef}>
        <div className="calendar__header">
          <span>Dates</span>
          <div className="calendar__dates">
            <button id="checkin" className={`calendar__dates__checkin${!this.state.hidePicker && !this.state.setSecondDate ? ' calendar__dates__active' : ''}${!this.state.from ? ' calendar__dates__unassigned' : ''}`} onClick={this.chooseCheckIn}>
              Check In
            </button>
            <img src="./images/right-arrow.png" alt="date from - to separator" className="calendar__dates__separator"></img>
            <button id="checkout" className={`calendar__dates__checkout${!this.state.hidePicker && this.state.setSecondDate ? ' calendar__dates__active' : ''}${!this.state.to ? ' calendar__dates__unassigned' : ''}`} onClick={this.chooseCheckOut}>
              Check Out
            </button>
          </div>
        </div>
        <div id="datePicker" className={`calendar__picker${this.state.hidePicker ? ' hidden' : ''}`}>
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
            unavailable={unavailableDates}
            naDays={this.state.naDays}
            handleSetDay={this.handleSetDay}
            setSecondDate={this.state.setSecondDate}
            handleSetCandidate={this.handleSetCandidate}
            handleDeleteCandidate={this.handleDeleteCandidate}
            candidate={this.state.candidate}
          />
          <SubscriptInfo
            lastUpdate={2}
            lastModified={this.state.lastModified}
            clearDates={this.clearDates}
          />
        </div>
      </div>
    );
  }
}
