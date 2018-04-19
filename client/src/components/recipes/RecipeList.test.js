import React from 'react';
import { shallow, mount } from 'enzyme';
import { RecipeList } from './RecipeList';

describe('RecipeList', () => {
  let recipeList = shallow(<RecipeList />);

  it('renders properly', () => {
    expect(recipeList).toMatchSnapshot();
  });

  describe('when mounted', () => {
    const mockRecipes = [
      { id: 1, imageurl: '', title: '' },
      { id: 2, imageurl: '', title: '' },
    ];
    // using beforeEach() seems to isolate the new rendered component
    // (eg: `loot = mount(<Loot {...props} />)`) to this block of tests
    beforeEach(() => {
      const props = { recipes: mockRecipes };
      // mounting component instead of shallow render, so we can test lifecycle methods
      recipeList = mount(<RecipeList {...props} />);
    });

    it('should render a container for each recipe in props', () => {
			console.log(recipeList);
			//expect(recipeList.find('.recipeList__link recipelist--overlay')).toHaveLength(mockRecipes.length);
    });
  });
});
