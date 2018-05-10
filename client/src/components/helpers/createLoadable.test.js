import React from 'react';
import { shallow } from 'enzyme';
import createLoadable from './createLoadable';

describe('createLoadable', () => {
  const TestLanding = createLoadable({
    loader: () => import('./../auth/Landing'),
  });
  const testLanding = shallow(<TestLanding />);

  it('should render properly', () => {
    expect(testLanding).toMatchSnapshot();
  });
});
