import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button, Input } from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;
  margin-right: 1em;
`

const FieldWrapper = ButtonWrapper.extend`
  display: flex;
  flex-direction: row;
`

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <FieldWrapper>
    <Input label={label} {...input} type={type} error={touched && error} focus placeholder={label }/>
  </FieldWrapper>
);



let PropertyForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      Add Property
      <FieldWrapper>
          <Field
            name="nodeKey"
            type="text"
            component={renderField}
            label="Key"
          />
          <Field
            name="nodeValue"
            type="text"
            component={renderField}
            label="Value"
          />
      </FieldWrapper>
      <ButtonWrapper>
        <Button type="submit" disabled={submitting}>Submit</Button>
        <Button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </Button>
      </ButtonWrapper>
    </form>
  );
};

PropertyForm = reduxForm({
  form: 'PropertyForm', // a unique identifier for this form
  enableReinitialize: true,
})(PropertyForm);

PropertyForm = connect()(PropertyForm)

export default PropertyForm
