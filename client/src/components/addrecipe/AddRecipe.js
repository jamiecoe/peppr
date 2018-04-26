import React, { Component } from 'react';
import { connect } from 'react-redux';

import UrlForm from './UrlForm';
import NewRecipeForm from './NewRecipeForm';
import Banner from '../MobileBanner';
import Navbar from '../Navbar';
import { showForm, resetRecipe } from '../../actions/recipes';
import { resetError } from '../../actions/auth';
import peppers from '../../assets/images/peppers.jpg';

export class AddRecipe extends Component {
  componentDidMount() {
    this.props.resetError();
    this.props.resetRecipe();
  }

  showRecipeForm = () => {
    this.props.showForm();
  }

  render() {
    return (
      <div>
        <Banner title="Add a recipe" />
        <img
          className="addrecipe__image"
          alt="red peppers on a dark background"
          src={peppers}
        />
        <div className="addrecipe__container">
          <h1 className="addrecipe__header addrecipe__innermargin">
            Add a Recipe
          </h1>
          <UrlForm />
          <button
            to="#"
            onClick={this.showRecipeForm}
            className="addrecipe__link addrecipe__innermargin"
          >
            Or enter your recipe details manually
          </button>
          {this.props.show ? <NewRecipeForm /> : <div />}
        </div>
        <Navbar page="addRecipe" />
      </div>
    );
  }
}

const mapStateToProps = state => ({ show: state.showForm });


export default connect(
  mapStateToProps,
  { showForm, resetError, resetRecipe },
)(AddRecipe);
