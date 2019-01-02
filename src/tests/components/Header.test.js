import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';
import { stayDetails } from '../../data/stayDetails';

const { price, currency, rating, reviews } = { ...stayDetails };

test('Should match Header snapshot.', () => {
  const wrapper = shallow(<Header
    price={price}
    currency={currency}
    rating={rating}
    reviews={reviews}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render rating as adequate number of stars', () => {
  //const rating = 3.5
  const wrapper = shallow(<Header
    price={price}
    currency={currency}
    rating={rating}
    reviews={reviews}
  />);
  const fullStars = Math.floor(rating);
  const halfStars = Math.floor(rating % 1 * 2);
  const blankStars = 5 - fullStars - halfStars;
  expect(wrapper.find('.header__rating__star').length).toEqual(fullStars);
  expect(wrapper.find('.header__rating__halfStar').length).toEqual(halfStars);
  expect(wrapper.find('.header__rating__blankStar').length).toEqual(blankStars);
  console.log(wrapper.find('.header__rating__blankStar'));
});