import React from 'react';
import { shallow } from 'enzyme';
import SubscriptInfo from '../../components/SubscriptInfo';

test('should render info & last update in SubscriptInfo correctly', () => {
  const wrapper = shallow(<SubscriptInfo />);
  expect(wrapper.exists('.subscript')).toEqual(true);
  expect(wrapper.exists('.subscript__info')).toEqual(true);
  expect(wrapper.exists('.subscript__update')).toEqual(true);
});