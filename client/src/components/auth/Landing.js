import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetError } from '../../actions/auth';
import peppers from '../../assets/images/peppers.jpg';

import SignUp from './Signup';
import SignIn from './Signin';

export class Landing extends Component {
  componentDidMount() {
    this.props.resetError();
  }

  renderForm() {
    return this.props.match.path === '/' ? (
      <SignIn name="SignIn" />
    ) : (
      <SignUp name="SignUp" />
    );
  }

  render() {
    return (
      <div>
        <img
          className="landing__image"
          alt="red peppers on a dark background"
          src={peppers}
        />
        <div className="landing__container">
          <h1 className="landing__header">PEPPR</h1>
          <p className="landing__tagline">All your recipes in one place</p>
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default connect(null, { resetError })(Landing);
