import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getRecipes } from '../../actions/recipes';
import RecipeList from './RecipeList';
import Navbar from '../Navbar';
import NoRecipes from './NoRecipes';
import Banner from '../MobileBanner';

export class Recipes extends Component {
  componentDidMount() {
    this.props.getRecipes();
  }

  render() {
    const { recipes } = this.props;

    if (!recipes) return <Navbar />;

    return (
      <div>
        <Banner title="My recipes" />
        {_.isEmpty(recipes) ? <NoRecipes /> : <RecipeList />}
        <Navbar />
      </div>
    );
  }
}

const mapStateToProps = ({ recipes }) => ({ recipes });

export default connect(mapStateToProps, { getRecipes })(Recipes);
