import React from 'react';
import { shallow } from 'enzyme';
import Month from '../../components/Month';
import { unavailableDates } from '../../data/unavailable';
import { THIS_YEAR, THIS_MONTH } from '../../helpers/calendar';


test('Should match Month snapshot.', () => {
  const current = { month: THIS_MONTH, year: THIS_YEAR };
  const handleSetDay = jest.fn();
  const handleSetCandidate = jest.fn();
  const handleDeleteCandidate = jest.fn();
  const wrapper = shallow(<Month
    current={current}
    unavailable={unavailableDates}
    handleSetDay={handleSetDay}
    handleSetCandidate={handleSetCandidate}
    handleDeleteCandidate={handleDeleteCandidate}
  />);
  expect(wrapper).toMatchSnapshot();
});