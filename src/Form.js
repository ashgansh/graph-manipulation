import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { load as loadAccount } from './account';
const data = {
  // used to populate "account" reducer when "Load" is clicked
  firstName: 'Jane',
  lastName: 'Doe',
  age: '42',
  sex: 'female',
  employed: true,
  favoriteColor: 'Blue',
  bio: 'Born to write amazing Redux code.',
};
const colors = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

const renderField = (attribute, index) => {

  return ( 
    <div key={index}>
      <label>{attribute}</label>
      <Field
        name={attribute}
        component="input"
        type="text"
      />
    </div>)
}

let  InitializeFromStateForm = ({ initialValues, handleSubmit, load, pristine, reset, submitting, currentNode }) => {
  if (!currentNode) {return <div>undefined</div>}
  if (Object.keys(currentNode).length === 0) {return <div>nope</div>}
  return (
    <form onSubmit={handleSubmit}>
      {Object.keys(currentNode).map((attribute, index) => renderField(attribute, index))}
    <div>
      <button type="submit" disabled={pristine || submitting}>Submit</button>
      <button type="button" disabled={pristine || submitting} onClick={reset}>
        Undo Changes
      </button>
    </div>
  </form>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState', // a unique identifier for this form
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({})
)(InitializeFromStateForm);

export default InitializeFromStateForm;
