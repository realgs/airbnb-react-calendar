import React from 'react';
import { shallow } from 'enzyme';
import Reservation from '../../components/Reservation';

test('Should render with datepicker hidden by default.', () => {
  const wrapper = shallow(<Reservation />);
  const calendarWrapper = wrapper.find('Calendar').dive();
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.state('dateMissing')).toBe(false);
  expect(wrapper.find('Calendar').exists()).toBe(true);
  expect(wrapper.find('Calendar').prop('dateMissing')).toBe(false);
  expect(calendarWrapper.state('hidePicker')).toBe(true);
});

test('Should ask for dates of reservation after submitting with no data provided.', () => {
  const wrapper = shallow(<Reservation />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('.button__reservation').simulate('click', {
    preventDefault: () => { }
  });
  expect(wrapper.state('dateMissing')).toBe(true);
  expect(wrapper.find('Calendar').exists()).toBeTruthy();
  expect(wrapper.find('Calendar').prop('dateMissing')).toBe(true);

  const calendarWrapper = wrapper.find('Calendar').dive();
  const calendarInstance = calendarWrapper.instance();
  calendarInstance.componentDidMount();
  calendarInstance.componentDidUpdate();
  expect(calendarWrapper.state('hidePicker')).toBe(false);
  expect(calendarWrapper).toMatchSnapshot();
  expect(wrapper).toMatchSnapshot();
});

test('Should set stay length correctly.', () => {
  const stayLength = 10;
  const wrapper = shallow(<Reservation />);
  wrapper.find('Calendar').prop('setStayLength')(stayLength);
  expect(wrapper.state('stayLength')).toEqual(Math.abs(stayLength));
});

test('Should set stay length correctly for negative values.', () => {
  const stayLength = -10;
  const wrapper = shallow(<Reservation />);
  wrapper.find('Calendar').prop('setStayLength')(stayLength);
  expect(wrapper.state('stayLength')).toEqual(Math.abs(stayLength));
});

test('Should set stay length correctly for no stay.', () => {
  const stayLength = 0;
  const wrapper = shallow(<Reservation />);
  wrapper.find('Calendar').prop('setStayLength')(stayLength);
  expect(wrapper.state('stayLength')).toEqual(Math.abs(stayLength));
});

test('Should set stay length correctly for null.', () => {
  const stayLength = null;
  const wrapper = shallow(<Reservation />);
  wrapper.find('Calendar').prop('setStayLength')(stayLength);
  expect(wrapper.state('stayLength')).toEqual(0);
});

test('Should set stay length correctly for undefined.', () => {
  const stayLength = undefined;
  const wrapper = shallow(<Reservation />);
  wrapper.find('Calendar').prop('setStayLength')(stayLength);
  expect(wrapper.state('stayLength')).toEqual(0);
});

test('dateNotMissing() should toggle dateMissing back to false', () => {
  const wrapper = shallow(<Reservation />);
  wrapper.find('.button__reservation').simulate('click', {
    preventDefault: () => { }
  });
  expect(wrapper.state('dateMissing')).toBe(true);
  wrapper.find('Calendar').prop('dateNotMissing')();
  expect(wrapper.state('dateMissing')).toBe(false);
});
