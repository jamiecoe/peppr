import Loadable from 'react-loadable';
import Loading from './Loading';

const createLoadable = opts =>
  Loadable(
    Object.assign(
      {
        loading: Loading,
        delay: 200,
        timeout: 10,
      },
      opts,
    ),
  );

export default createLoadable;
