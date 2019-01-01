import React from 'react';
import { shallow, mount } from 'enzyme';
import Reservation from '../../components/Reservation';

test('Should ask for dates of reservation when no data provided.', () => {
  const wrapper = shallow(<Reservation />);
  expect(wrapper).toMatchSnapshot();
  wrapper.find('.button__reservation').simulate('click', {
    preventDefault: () => {}
  });
  expect(wrapper.state('dateMissing')).toBe(true);
  expect(wrapper.find('Calendar').exists()).toBeTruthy();
  expect(wrapper.find('Calendar').prop('dateMissing')).toBe(true);
  expect(wrapper).toMatchSnapshot();
});