import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import Calendar from './components/Calendar';
import Header from './components/Header';

const price = 59.9;
const currency = 'zł';
const rating = 4;
const reviews = 123;

const jsx = (
  <div className="wrapper">
    <Header
      price={price}
      currency={currency}
      rating={rating}
      reviews={reviews}
    />
    <Calendar minStay={2} />
  </div>
);
ReactDOM.render(jsx, document.getElementById('app'));
