import React from 'react';
import Calendar from './Calendar';
import Header from './Header';
import Costs from './Costs';
import { stayDetails } from '../data/stayDetails';
import { round2Decimals } from '../helpers/calendar';

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.setStayLength = this.setStayLength.bind(this);
    this.handleReservation = this.handleReservation.bind(this);
    this.dateNotMissing = this.dateNotMissing.bind(this);
    this.state ={
      user: undefined,
      price: 0,
      currency: '$',
      rating : 0,
      reviews : 0,
      bonus : 0,
      cleaningFee : 0,
      stayLength : 0,
      minStay: undefined,
      total: 0,
      serviceFee: 0,
      bonusUsed: 0,
      amount: 0,
      serviceFee: 0,
      total: 0,
      dateMissing: false,
    };
  }

  componentDidMount(){
    this.setState({
      ...stayDetails
    });
  }
  componentDidUpdate(){
  }

  setStayLength (newStayLength) {
    const stayLength = newStayLength ? Math.abs(newStayLength) : 0;
    const amount = round2Decimals(this.state.price * stayLength);
    const serviceFee = round2Decimals(this.state.price * stayLength * 0.1);
    const total = round2Decimals(amount + this.state.cleaningFee + serviceFee - this.state.bonus);
    this.setState({
      stayLength,
      amount,
      serviceFee,
      total
    });
  }

  handleReservation() {
    if (this.state.user){
      if (this.state.stayLength != 0) {
        const reservation = {
          user: this.state.user,
          amount: this.state.amount,
          serviceFee: this.state.serviceFee,
          total: this.state.total,
          stayLength: this.state.stayLength,
          discount: this.state.total > 0 ? this.state.bonus : 0,
        };
        console.log(reservation);
      } else {
        this.setState({ dateMissing : true });
      }
    }
  }

  dateNotMissing() {
    this.setState({ dateMissing: false });
  }

  render(){
    return (
      <div className="wrapper">
        <Header
          price={this.state.price}
          currency={this.state.currency}
          rating={this.state.rating}
          reviews={this.state.reviews}
        />
        <Calendar
          minStay={this.state.minStay}
          setStayLength={this.setStayLength}
          dateMissing={this.state.dateMissing}
          dateNotMissing={this.dateNotMissing}
        />
        <Costs
          price={this.state.price}
          currency={this.state.currency}
          stayLength={this.state.stayLength}
          cleaningFee={this.state.cleaningFee}
          bonus={this.state.bonus}
          amount={this.state.amount}
          serviceFee={this.state.serviceFee}
          total={this.state.total}
        />
        <button className="button__reservation" onClick={this.handleReservation}>
          Request to Book
        </button>
      </div>
    );
  }
}
