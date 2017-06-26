import React from "react"
import {connect} from "react-redux"
import {Field, reduxForm} from "redux-form"
import {Input, Button} from "semantic-ui-react"

const renderField = (attribute, index) => {
  return (
    <Field
      label={attribute}
      name={attribute}
      component={Input}
      type="text"
      key={index}
    />
  )
}

let InitializeFromStateForm = ({
  initialValues,
  handleSubmit,
  load,
  pristine,
  reset,
  submitting,
  currentNode
}) => {
  if (!currentNode) {
    return <div>undefined</div>
  }
  if (Object.keys(currentNode).length === 0) {
    return <div>nope</div>
  }
  return (
    <form
      style={{display: "flex", flexDirection: 'column'}}
      onSubmit={handleSubmit}
    >
      {Object.keys(currentNode).map((attribute, index) =>
        renderField(attribute, index)
      )}
      <div>
        <Button  primary type="submit" disabled={pristine || submitting}>Submit</Button>
        <Button secondary type="button" disabled={pristine || submitting} onClick={reset}>
          Undo Changes
        </Button>
      </div>
    </form>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: "initializeFromState", // a unique identifier for this form
  enableReinitialize: true
})(InitializeFromStateForm)

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(state => ({}))(InitializeFromStateForm)

export default InitializeFromStateForm
