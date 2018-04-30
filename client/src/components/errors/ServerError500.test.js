import React from 'react';
import { shallow } from 'enzyme';
import ServerError from './ServerError500';

describe('ServerError', () => {
  const serverError = shallow(<ServerError />);

  it('should render properly', () => {
    expect(serverError).toMatchSnapshot();
  });
});
