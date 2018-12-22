import React from 'react';

const Header = ({ price, currency, rating, reviews }) => {
return (
  <div className="header">
    <div className="header__price">
      <div className="header__price__value">
        {`${price} ${currency}`}
      </div>
      <div className="header__price__note">
        per night
        </div>
    </div>
    <div className="header__rating">
      {`4/5 ${reviews}`}
    </div>
  </div>
);
};
export default Header;