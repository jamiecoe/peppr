import React from 'react';
import { shallow } from 'enzyme';
import NoRecipes from './NoRecipes';

describe('NoRecipes', () => {
  const noRecipes = shallow(<NoRecipes />);

  it('renders properly', () => {
    expect(noRecipes).toMatchSnapshot();
  });
});
