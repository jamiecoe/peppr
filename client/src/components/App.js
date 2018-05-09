import React, { Component } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../actions/auth';

import createLoadable from './helpers/createLoadable';
import history from '../actions/history';

const Landing = createLoadable({ loader: () => import('./auth/Landing') });
const AddRecipe = createLoadable({ loader: () => import('./addrecipe/AddRecipe') });
const Recipes = createLoadable({ loader: () => import('./recipes/Recipes') });
const SingleRecipe = createLoadable({ loader: () => import('./recipes/SingleRecipe') });
const ServerError = createLoadable({ loader: () => import('./errors/ServerError500') });
const NotFound = createLoadable({ loader: () => import('./errors/NotFound400') });

export class App extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    if (this.props.auth === null) return <div />;
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/"
            render={props =>
              (!this.props.auth ? (
                <Landing {...props} />
              ) : (
                <Redirect to="/recipes" />
              ))
            }
          />

          <Route
            exact
            path="/signup"
            render={props =>
              (!this.props.auth ? (
                <Landing {...props} />
              ) : (
                <Redirect to="/recipes" />
              ))
            }
          />

          <Route
            exact
            path="/recipes"
            render={() => (this.props.auth ? <Recipes /> : <Redirect to="/" />)}
          />

          <Route
            exact
            path="/recipes/:id"
            render={props =>
              (this.props.auth ? (
                <SingleRecipe {...props} />
              ) : (
                <Redirect to="/" />
              ))
            }
          />

          <Route
            exact
            path="/addrecipe"
            render={() =>
              (this.props.auth ? <AddRecipe /> : <Redirect to="/" />)
            }
          />

          <Route
            exact
            path="/servererror"
            render={() =>
              (this.props.auth ? <ServerError /> : <Redirect to="/" />)
            }
          />

          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({ auth: state.auth });

export default connect(mapStateToProps, { getUser })(App);
