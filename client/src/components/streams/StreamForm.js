import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends Component {
    renderInputError(error) {
        return (
            <div className="ui error tiny message">
                <span className="header">{error}</span>
            </div>
        );
    }

    renderInput = ({ label, input, meta: { touched, submitFailed, error }}) => {
        let hasBeenTouchedAndHasError = (touched || submitFailed) && error;

        return (
            <div className={`field ${hasBeenTouchedAndHasError && "error"}`}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {hasBeenTouchedAndHasError && this.renderInputError(error)}
            </div>
        );
    }

    render() {
        // note: handleSubmit comes from redux-form and included event.preventDefault()
        // handleOnSubmit comes from parent component and it gets the formValues
        const { 
            formTitle,
            fieldTitle,
            fieldDescription,
            buttonText,
            handleOnSubmit, 
            handleSubmit 
        } = this.props;

        return (
            <form onSubmit={handleSubmit(handleOnSubmit)} className="ui form error">
                <h1>{formTitle}</h1>
                <Field name="title" component={this.renderInput} label={fieldTitle}/>
                <Field name="description" component={this.renderInput} label={fieldDescription} />
                <button className="ui button large inverted red">{buttonText}</button>
            </form>
        );
    }
}

const validate = ({ title, description }) => {
    let errors = {};

    if (!title) {
        errors.title = "Streams must have a title"
    }

    if (!description) {
        errors.description = "Please tell us a bit about your Stream"
    }

    return errors;
}

export default reduxForm({
    form: "streamForm",
    validate
})(StreamForm);