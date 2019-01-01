import React from 'react';
import { shallow } from 'enzyme';
import Month from '../../components/Month';
import Calendar from '../../components/Calendar';
import { THIS_YEAR, THIS_MONTH } from '../../helpers/calendar';


test('Should render Month correctly', () => {
  const current = { month: THIS_MONTH, year: THIS_YEAR };
  const handleSetDay = jest.fn();
  const handleSetDayHover = jest.fn();
  const handleUnsetDayHover = jest.fn();
  const wrapper = shallow(<Month
    current={current}
    from={null}
    to={null}
    unavailable={["30-01-2018"]}
    minStay={1}
    naDays={["30-01-2018"]}
    handleSetDay={Calendar.handleSetDay}
    setSecondDate={false}
    handleSetDayHover={Calendar.handleSetDayHover}
    handleUnsetDayHover={Calendar.handleUnsetDayHover}
    candidate = { null}
    />);

});