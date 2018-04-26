import React from 'react';
import { shallow } from 'enzyme';
import { AddRecipe } from './AddRecipe';

describe('AddRecipes', () => {
  const mockShowForm = jest.fn();
  const mockResetError = jest.fn();
  const mockResetRecipe = jest.fn();

  const props = {
    showForm: mockShowForm,
    resetError: mockResetError,
    resetRecipe: mockResetRecipe,
    show: false,
  };

  let addRecipe = shallow(<AddRecipe {...props} />, {
    disableLifecycleMethods: false,
  });

  it('renders properly, and NOT show <NewRecipeForm>', () => {
    expect(addRecipe).toMatchSnapshot();
    expect(addRecipe.find('Connect(ReduxForm)').exists()).not.toBe(true);
  });

  it('should call `resetForm` and `resetRecipe` in componentDidMount()', () => {
    expect(mockResetError).toHaveBeenCalled();
    expect(mockResetRecipe).toHaveBeenCalled();
  });

  describe('when the user clicks on the `enter details manually` button', () => {
    beforeEach(() => {
      addRecipe
        .find('.addrecipe__link.addrecipe__innermargin')
        .simulate('click');
    });

    it('should call the `showForm` function supplied from props', () => {
      expect(mockShowForm).toHaveBeenCalled();
    });
  });

  describe('when `props.show` is true', () => {
    beforeEach(() => {
      props.show = true;
      addRecipe = shallow(<AddRecipe {...props} />);
    });

    it('should render properly, and show <NewRecipeForm>', () => {
      expect(addRecipe).toMatchSnapshot();
      expect(addRecipe.find('Connect(ReduxForm)').exists()).toBe(true);
    });
  });
});
