import React from 'react';

const Header = ({ price, currency, rating, reviews }) => {
  const fullStars = Math.floor(rating);
  const halfStars = Math.floor(rating % 1 * 2);
  const blankStars = 5 - fullStars - halfStars;

  const renderFullStars = (number) => {
    return typeof number === 'number' && number > 0 ? [... new Array(number)].map((elem, index) => {
      return <img src="./images/star.png" key={`star${index}`} className="header__rating__star"></img>;
    })
      : '';
  };
  const renderHalfStar = (number) => {
    return typeof number === 'number' && number > 0 ? <img src="./images/halfStar.png" key="halfStar" className="header__rating__halfStar"></img> : '';
  };
  const renderBlankStars = (number) => {
    return typeof number === 'number' && number > 0 ? [... new Array(number)].map((elem, index) => {
      return <img src="./images/blankStar.png" key={`blankStar${index}`} className="header__rating__blankStar"></img>;
    })
      : '';
  };

  return (
    <div className="header">
      <div className="header__price">
        <div className="header__price__value">
          {`${currency}${price}`}
        </div>
        <div className="header__price__note">
          per night
        </div>
      </div>
      <div className="header__rating">
        <div>
          {renderFullStars(fullStars)}
          {renderHalfStar(halfStars)}
          {renderBlankStars(blankStars)}
        </div>
        <div className="header__reviews">{reviews}</div>
      </div>
    </div>
  );
};

export default Header;