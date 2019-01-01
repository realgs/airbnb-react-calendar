import React from 'react';
import { shallow } from 'enzyme';
import SubscriptInfo from '../../components/SubscriptInfo';

test('Should render info & last update in SubscriptInfo correctly', () => {
  const wrapper = shallow(<SubscriptInfo lastModified={"30-01-2019"} lastUpdate={2} clearDates={SubscriptInfo.clearDates} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.subscript').exists()).toBeTruthy();
  expect(wrapper.find('.subscript__info').exists()).toBeTruthy();
  expect(wrapper.find('.subscript__update').exists()).toBeTruthy();
  expect(wrapper.find('.subscript__clearDates').exists()).toBeTruthy();
});

test('Should render SubscriptInfo with no data provided', () => {
  const wrapper = shallow(<SubscriptInfo lastModified={null} lastUpdate={null} clearDates={null} />);
  expect(wrapper).toMatchSnapshot();
  expect(wrapper.find('.subscript').exists()).toBeTruthy();
  expect(wrapper.find('.subscript__info').exists()).toBeTruthy();
  expect(wrapper.find('.subscript__clearDates').exists()).toBeFalsy();
  expect(wrapper.find('.subscript__update').exists()).toBeFalsy();
});