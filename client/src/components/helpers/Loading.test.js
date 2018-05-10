import React from 'react';
import { shallow } from 'enzyme';
import Loading from './Loading';

describe('Loading', () => {
  const mockRetry = jest.fn();
  const props = {
    error: null,
    isLoading: true,
    pastDelay: false,
    retry: mockRetry,
    timedOut: false,
  };

  let loading = shallow(<Loading {...props} />);

  it('should render properly', () => {
    expect(loading).toMatchSnapshot();
  });

  describe('when there is an error on props', () => {
    beforeEach(() => {
      props.error = 'test error';
      loading = shallow(<Loading {...props} />);
    });

    afterEach(() => {
      props.error = null;
    });

    it('should render properly', () => {
      expect(loading).toMatchSnapshot();
    });

    it('should call retry() method on props, when button is clicked', () => {
      loading.find('button').simulate('click');
      expect(mockRetry).toHaveBeenCalled();
    });
  });

  describe('when Loading has timed out', () => {
    beforeEach(() => {
      props.timedOut = true;
      loading = shallow(<Loading {...props} />);
    });

    afterEach(() => {
      props.timedOut = false;
    });

    it('should render properly', () => {
      expect(loading).toMatchSnapshot();
    });

    it('should call retry() method on props, when button is clicked', () => {
      loading.find('button').simulate('click');
      expect(mockRetry).toHaveBeenCalled();
    });
  });

  describe('when delay is longer than your set delay', () => {
    beforeEach(() => {
      props.pastDelay = true;
      loading = shallow(<Loading {...props} />);
    });

    afterEach(() => {
      props.pastDelay = false;
    });

    it('should render properly', () => {
      expect(loading).toMatchSnapshot();
    });
  });
});
