import React from 'react';
import { shallow } from 'enzyme';
import Costs from '../../components/Costs';
import { stayDetails } from '../../data/stayDetails';

const { price, currency, stayLength, cleaningFee, bonus } = { ...stayDetails };

test('Should match Costs snapshot.', () => {
  const wrapper = shallow(<Costs
    price={price}
    currency={currency}
    stayLength={stayLength}
    cleaningFee={cleaningFee}
    bonus={bonus}
  />);
  expect(wrapper).toMatchSnapshot();
});

test('Should not show bonus if <= 0', () => {
  const wrapper = shallow(<Costs bonus={0} />);
  expect(wrapper.find('.costs__bonus').exists()).toBe(false);
});

test('Should show bonus if both bonus and total > 0', () => {
  const wrapper = shallow(<Costs
    bonus={10}
    total={20}
  />);
  expect(wrapper.find('.costs__bonus').exists()).toBe(true);
});