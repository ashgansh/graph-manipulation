import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
// import { load as loadAccount } from './account';


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
enableReinitialize: true
})(InitializeFromStateForm);

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({})
)(InitializeFromStateForm);

export default InitializeFromStateForm;
