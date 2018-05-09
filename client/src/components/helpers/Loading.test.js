import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('Loading', () => {
  const loading = shallow(<Loading />);

  it('should render properly', () => {
    expect(loading).toMatchSnapshot();
  });
});
