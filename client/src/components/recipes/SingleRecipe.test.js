import React from 'react';
import { shallow } from 'enzyme';
import { SingleRecipe } from './SingleRecipe';

describe('SingleRecipe', () => {
  const mockRecipe = {
    imageurl: '',
    ingredients: '',
    method: '',
    title: '',
  };

  const mockGetSingleRecipe = jest.fn();
  const mockDeleteRecipe = jest.fn();

  const props = {
    recipe: mockRecipe,
    getSingleRecipe: mockGetSingleRecipe,
    deleteRecipe: mockDeleteRecipe,
    match: {
      params: {
        id: 2,
      },
    },
  };

  let singleRecipe = shallow(<SingleRecipe {...props} />);

  it('renders properly', () => {
    expect(singleRecipe).toMatchSnapshot();
  });

  describe('when user clicks on delete button', () => {
    beforeEach(() => {
      singleRecipe.find('.singleRecipe__deleteButton').simulate('click');
    });

    it('should call the `deleteRecipe` method it receives from props with the id on the url params', () => {
      expect(mockDeleteRecipe).toHaveBeenCalledWith(props.match.params.id);
    });
  });

  describe('when `recipe` props has not been set yet', () => {
    beforeEach(() => {
      props.recipe = undefined;
      props.getSingleRecipe = mockGetSingleRecipe;
      singleRecipe = shallow(<SingleRecipe {...props} />, {
        disableLifecycleMethods: false,
      });
    });

    it('should only render a loading message <div>', () => {
      expect(singleRecipe).toMatchSnapshot();
    });

    it('calls the `getSingleRecipe` method it receives from props on componentDidMount() with the id on the url params', () => {
      expect(mockGetSingleRecipe).toHaveBeenCalledWith(props.match.params.id);
    });
  });
});
