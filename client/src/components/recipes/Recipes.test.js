import React from 'react';
import { shallow } from 'enzyme';
import { Recipes } from './Recipes';

describe('RecipeList', () => {
  const mockGetRecipes = jest.fn();
  const mockRecipes = [
    { id: 1, imageurl: '', title: '' },
    { id: 2, imageurl: '', title: '' },
  ];
  const props = {
    getRecipes: mockGetRecipes,
    recipes: mockRecipes,
  };
  let recipes = shallow(<Recipes {...props} />, { disableLifecycleMethods: false });

  it('renders properly', () => {
    expect(recipes).toMatchSnapshot();
  });

  it('calls the `getRecipes` method it receives from props on componentDidMount()', () => {
    expect(mockGetRecipes).toHaveBeenCalled();
  });

  it('should find the <RecipeList> component if `recipes` props have been passed in', () => {
    expect(recipes.find('Connect(RecipeList)').exists()).toBe(true);
  });

  describe('when no `recipes` props have been passed in', () => {
    beforeEach(() => {
      props.recipes = {};
      recipes = shallow(<Recipes {...props} />);
    });

    it('should find the <NoRecipes> component', () => {
      expect(recipes).toMatchSnapshot();
    });
  });

  describe('when `recipes` props is falsy', () => {
    beforeEach(() => {
      props.recipes = undefined;
      recipes = shallow(<Recipes {...props} />);
    });

    it('should only find the <Navbar> component', () => {
      expect(recipes).toMatchSnapshot();
    });
  });
});
