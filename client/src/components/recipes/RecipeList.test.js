import React from 'react';
import { shallow } from 'enzyme';
import { RecipeList } from './RecipeList';

describe('RecipeList', () => {
  const mockRecipes = [
    { id: 1, imageurl: '', title: '' },
    { id: 2, imageurl: '', title: '' },
  ];
  const props = { recipes: mockRecipes };
  const recipeList = shallow(<RecipeList {...props} />);

  it('renders properly', () => {
    expect(recipeList).toMatchSnapshot();
  });

  it('should render a container for each recipe in props', () => {
    expect(recipeList.find('.recipeList__link--container')).toHaveLength(mockRecipes.length);
  });

  it('should render enough .recipeList__link containers to always fill 3 columns', () => {
    expect(recipeList.find('.recipeList__link').length % 3).toBe(0);
  });
});
