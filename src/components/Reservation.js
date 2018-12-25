import React from 'react';
import Calendar from './Calendar';
import Header from './Header';
import Costs from './Costs';
import { stayDetails } from '../data/stayDetails';

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.setStayLength = this.setStayLength.bind(this);
    this.state ={
      price: 0,
      currency: '$',
      rating : 0,
      reviews : 0,
      bonus : 0,
      cleaningFee : 0,
      stayLength : 0,
      minStay: undefined,
    };
  }
  componentDidMount(){
    this.setState({
      ...stayDetails
    });
  }

  setStayLength (stayLength) {
    this.setState({ stayLength });
  };
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
        />
        <Costs
          price={this.state.price}
          currency={this.state.currency}
          stayLength={this.state.stayLength}
          cleaningFee={this.state.cleaningFee}
          bonus={this.state.bonus}
        />
        <button className="button__reservation">
          Request to Book
        </button>
      </div>
    );
  }
}
