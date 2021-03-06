import React from 'react';
import { Link } from 'react-router-dom';
import peppers from '../../assets/images/peppers.jpg';

const NotFound = () => (
  <div className="errorpage__container">
    <img
      className="errorpage__image"
      alt="red peppers on a dark background"
      src={peppers}
    />
    <div className="errorpage__message">
      <p className="errorpage__message--large">Oops!</p>
      <p>
        404. We can&apos;t find the page you&apos;re looking for. Please try again or
        navigate <Link to="/">home</Link>
      </p>
    </div>
  </div>
);

export default NotFound;
