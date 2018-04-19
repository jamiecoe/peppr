import React from 'react';
import { Link } from 'react-router-dom';
import peppers from '../../assets/images/peppers.jpg';

const serverError = () => (
  <div className="errorpage__container">
    <img
      className="errorpage__image"
      alt="red peppers on a dark background"
      src={peppers}
    />
    <div className="errorpage__message">
      <p className="errorpage__message--large">Oops!</p>
      <p>
        500. That&apos;s a server error. Please try again later or navigate{' '}
        <Link to="/">home</Link>
      </p>
    </div>
  </div>
);

export default serverError;
