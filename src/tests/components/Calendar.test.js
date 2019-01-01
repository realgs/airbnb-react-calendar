import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../../components/Calendar';
import { getDateISO, THIS_YEAR, THIS_MONTH } from '../../helpers/calendar';

const today = getDateISO();

test('Should match Calendar snapshot.', () => {
  const wrapper = shallow(<Calendar />);
  expect(wrapper).toMatchSnapshot();
});

test('Should set today as a candidate (for hover).', () => {
  const wrapper = shallow(<Calendar />);
  wrapper.find('Month').prop('handleSetCandidate')(today);
  expect(wrapper.state('candidate')).toEqual(today);
});

test('Should remove a candidate.', () => {
  const wrapper = shallow(<Calendar />);
  wrapper.find('Month').prop('handleDeleteCandidate')();
  expect(wrapper.state('candidate')).toEqual(null);
});

test('Should set checkin correctly.', () => {
  const fromDate = "2019-01-01";
  const toDate = "2019-01-02";
  const newDate = "2018-12-31";
  const setStayLength = jest.fn();
  const wrapper = shallow(<Calendar setStayLength={setStayLength} />);
  wrapper.setState({
    setSecondDate: false,
    from: fromDate,
    to: toDate,
  });

  expect(wrapper.state('from')).toEqual(fromDate);
  wrapper.find('Month').prop('handleSetDay')(newDate);
  expect(wrapper.state('from')).toEqual(newDate);
});

test('Should set checkout correctly.', () => {
  const fromDate = "2019-01-01";
  const toDate = "2019-01-02";
  const newDate = "2019-01-31";
  const setStayLength = jest.fn();
  const wrapper = shallow(<Calendar setStayLength={setStayLength} />);
  wrapper.setState({
    setSecondDate: true,
    from: fromDate,
    to: toDate,
  });

  expect(wrapper.state('to')).toEqual(toDate);
  wrapper.find('Month').prop('handleSetDay')(newDate);
  expect(wrapper.state('to')).toEqual(newDate);
});

test('Should set new checkin & erase checkout if checkin is selected as later than checkout.', () => {
  const fromDate = "2019-01-01";
  const toDate = "2019-01-02";
  const newDate = "2019-01-31";
  const setStayLength = jest.fn();
  const wrapper = shallow(<Calendar setStayLength={setStayLength} />);
  wrapper.setState({
    setSecondDate: false,
    from: fromDate,
    to: toDate,
  });

  expect(wrapper.state('from')).toEqual(fromDate);
  wrapper.find('Month').prop('handleSetDay')(newDate);
  expect(wrapper.state('from')).toEqual(newDate);
  expect(wrapper.state('to')).toEqual(null);
});

test('Should switch checkin and checkout if checkout selected as earlier than checkin.', () => {
  const fromDate = "2019-01-01";
  const toDate = "2019-01-02";
  const newDate = "2018-12-31";
  const setStayLength = jest.fn();
  const wrapper = shallow(<Calendar setStayLength={setStayLength} />);
  wrapper.setState({
    setSecondDate: true,
    from: fromDate,
    to: toDate,
  });

  expect(wrapper.state('from')).toEqual(fromDate);
  wrapper.find('Month').prop('handleSetDay')(newDate);
  const calendarInstance = wrapper.instance();
  calendarInstance.componentDidMount();
  calendarInstance.componentDidUpdate(calendarInstance.state);
  expect(wrapper.state('from')).toEqual(newDate);
  expect(wrapper.state('to')).toEqual(fromDate);
});
