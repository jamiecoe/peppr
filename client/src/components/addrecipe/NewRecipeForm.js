import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addRecipe } from '../../actions/recipes';

export class NewRecipeForm extends Component {
  onSubmit(values) {
    this.props.addRecipe(values);
  }

  renderField(field) {
    const { touched, error } = field.meta;
    return (
      <div className="newrecipe__form">
        {field.textfield ? (
          <textarea
            rows="4"
            cols="50"
            className="newrecipe__textarea"
            aria-label={field.arialabel}
            placeholder={field.placeholder}
            {...field.input}
          />
        ) : (
          <input
            type="text"
            className="newrecipe__input"
            aria-label={field.arialabel}
            placeholder={field.placeholder}
            {...field.input}
          />
        )}
        <p className="newrecipe__input--errortext">{touched ? error : ''}</p>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form
        className="newrecipe__form__container addrecipe__innermargin"
        onSubmit={handleSubmit(this.onSubmit.bind(this))}
      >
        <Field
          placeholder="Title"
          name="title"
          textfield={false}
          arialabel="Title"
          component={this.renderField}
        />
        <Field
          placeholder="Ingredients"
          name="ingredients"
          textfield
          arialabel="Ingredients"
          component={this.renderField}
        />
        <Field
          placeholder="Method"
          name="method"
          textfield
          arialabel="Method"
          component={this.renderField}
        />
        <Field
          placeholder="Image Url (optional)"
          name="imageUrl"
          textfield
          arialabel="Image Url (optional)"
          component={this.renderField}
        />
        <Field
          placeholder="Tags (optional)"
          name="tags"
          textfield
          arialabel="Tags (optional)"
          component={this.renderField}
        />
        <input
          type="submit"
          className="newrecipe__form__btn"
          defaultValue="Save"
        />
      </form>
    );
  }
}

export const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.ingredients) {
    errors.ingredients = 'Enter your ingredients';
  }
  if (!values.method) {
    errors.method = 'Enter your method steps';
  }

  return errors;
};

const mapStateToProps = state => ({ initialValues: state.newRecipe });

const NewRecipeFormReduxForm = reduxForm({
  validate,
  enableReinitialize: true,
  form: 'NewRecipeForm',
})(NewRecipeForm);

export default connect(mapStateToProps, { addRecipe })(NewRecipeFormReduxForm);
