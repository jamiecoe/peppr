import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound400';

describe('NotFound', () => {
  const notFound = shallow(<NotFound />);

  it('should render properly', () => {
    expect(notFound).toMatchSnapshot();
  });
});
