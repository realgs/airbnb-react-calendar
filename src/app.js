import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import Calendar from './components/Calendar';

const jsx = (
  <div className="wrapper">
    <div className="header">
    </div>
    <Calendar minStay={2} price={59.90} rating={4.5} />
  </div>
);
ReactDOM.render(jsx, document.getElementById('app'));
