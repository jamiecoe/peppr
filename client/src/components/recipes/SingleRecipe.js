import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shortid from 'shortid';
import { getSingleRecipe, deleteRecipe } from '../../actions/recipes';
import Navbar from '../Navbar';

export class SingleRecipe extends Component {
  componentDidMount() {
    if (!this.props.recipe) {
      const { id } = this.props.match.params;
      this.props.getSingleRecipe(id);
    }
  }

  onDeleteClick = () => {
    const { id } = this.props.match.params;
    this.props.deleteRecipe(id);
  };

  renderStringToList(str) {
    const stringSplit = str.includes('\n\n') ? '\n\n' : '\n';
    return str.split(stringSplit).map((line, index) => {
      if (index !== str.split(stringSplit).length - 1) {
        return <li key={shortid.generate()}>{line}</li>;
      }
      return null;
    });
  }

  render() {
    const { recipe } = this.props;

    if (!recipe) return <div>Loading...</div>;

    return (
      <div className="singleRecipe__container">
        <div
          className="singleRecipe__img"
          style={{ backgroundImage: `url(${recipe.imageurl})` }}
        />
        <div className="singleRecipe__textcontainer--outer">
          <div className="singleRecipe__textcontainer--inner">
            <Link className="singleRecipe__backarrow" to="/recipes">
              <i className="ion-ios-arrow-back" />
            </Link>
            <h1 className="singleRecipe__title">{recipe.title}</h1>
            <h2 className="singleRecipe__sub-title">Ingredients</h2>
            <ul className="singleRecipe__list--ingredients">
              {this.renderStringToList(recipe.ingredients)}
            </ul>
            <h2 className="singleRecipe__sub-title">Method</h2>
            <ol className="singleRecipe__list--method">
              {this.renderStringToList(recipe.method)}
            </ol>
            <button
              className="singleRecipe__deleteButton"
              onClick={this.onDeleteClick}
            >
              Delete Recipe
            </button>
          </div>
        </div>
        <Navbar page="singleRecipe" />
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }, ownProps) =>
  (recipes ? { recipe: recipes[ownProps.match.params.id] } : { recipe: recipes });

export default connect(mapStateToProps, { getSingleRecipe, deleteRecipe })(SingleRecipe);
