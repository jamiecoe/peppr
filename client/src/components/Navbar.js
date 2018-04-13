import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';

export class Navbar extends Component {
  logout = () => {
    this.props.logoutUser();
  }

  render() {
    let className = '';
    switch (this.props.page) {
      case 'singleRecipe':
        className = 'navbar navbar-mobile-hidden';
        break;
      case 'addRecipe':
        className = 'navbar addrecipe__navbar';
        break;
      default:
        className = 'navbar';
    }

    return (
      <nav className={className}>
        <ul>
          <li className="navbar__homelogo">
            <Link to="/recipes">PEPPR</Link>
          </li>
          <li className="navbar__link">
            <Link to="/recipes">
              <i className="ion-ios-nutrition-outline navbar__icon" />
              Recipes
            </Link>
          </li>
          <li className="navbar__link">
            <Link to="/addrecipe">
              <i className="ion-ios-plus-outline navbar__icon" />
              Add
            </Link>
          </li>
          <li className="navbar__link">
            <Link to="/" onClick={this.logout}>
              <i className="ion-ios-undo-outline navbar__icon" />
              Log out
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default connect(null, { logoutUser })(Navbar);
