import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css'
import './styles/styles.scss';
import Calendar from './components/Calendar';
const jsx = (
  <div className="wrapper">
    <Calendar />
  </div>
);

ReactDOM.render(<Calendar />, document.getElementById('app'));
