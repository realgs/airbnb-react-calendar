import React from 'react';
import {round2Decimals} from '../helpers/calendar';

const Costs = ({ price, currency, stayLength, cleaningFee, bonus}) => {
  const amount = price * stayLength;
  const serviceFee = round2Decimals( price * stayLength * 0.1 );
  return (
    <div className="costs">
      <div className="costs__cost">
        <span className="costs__cost__description">
          {price} x {stayLength} days
        </span>
        <span className="costs__cost__amount">{ `${currency}${amount}` }</span>
      </div>
      <div className="costs__cost">
        <span className="costs__cost__description">
          Cleaning fee
        </span>
        <span className="costs__cost__amount">{ `${currency}${cleaningFee}` }</span>
      </div>
      <div className="costs__cost">
        <span className="costs__cost__description">
          Service fee
        </span>
        <span className="costs__cost__amount">{`${currency}${serviceFee}`}</span>
      </div>
      <div className="costs__cost costs__bonus">
        <span className="costs__cost__description">
          Bonus funds
        </span>
        <span className="costs__cost__amount">{`-${currency}${ bonus }`}</span>
      </div>
      <div className="costs__cost costs__sum">
        <span className="costs__cost__description">
          Total
        </span>
        <span className="costs__cost__amount">${round2Decimals(amount + cleaningFee + serviceFee - bonus) }</span>
      </div>
    </div>
  );
};

export default Costs;