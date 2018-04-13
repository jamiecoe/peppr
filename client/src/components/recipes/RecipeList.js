import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Navbar from '../Navbar';

class RecipeList extends Component {
  extraPosts() {
    const remainder = _.size(this.props.recipes) % 3;

    if (remainder) {
      const remainderArray = [];
      let i = 0;
      while (i < 3 - remainder) {
        remainderArray.push(<div className="recipeList__link" key={i} />);
        i += 1;
      }
      return remainderArray;
    }
    return null;
  }

  renderPosts() {
    return _.map(this.props.recipes, recipe => (
      <Link
        to={`/recipes/${recipe.id}`}
        className="recipeList__link recipelist--overlay"
        key={recipe.id}
      >
        <div
          className="recipeList__link--container"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1), rgba(255,255,255,0.1)), url(${
              recipe.imageurl
            })`,
          }}
        >
          <div className="recipeList__link--innercontainer">
            <h2 className="recipeList__recipeTitle">{recipe.title}</h2>
          </div>
        </div>
      </Link>
    ));
  }

  render() {
    return (
      <div className="recipeList__container">
        <div className="recipeList__allrecipes">
          <div className="recipeList__link">
            <h1 className="recipeList__title">My Recipes</h1>
          </div>
          <div className="recipeList__link" />
          <div className="recipeList__link recipeList__hidden-2x2" />
          {this.renderPosts()}
          {this.extraPosts()}
        </div>
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes });

export default connect(mapStateToProps)(RecipeList);
