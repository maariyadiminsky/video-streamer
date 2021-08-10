import React, { Component } from "react";
import { Field, Form } from "redux-form";

class StreamForm extends Component {
    validate = ({ title, description }) => {
        let errors = {};
    
        if (!title) {
            errors.title = "Streams must have a title"
        }
    
        if (!description) {
            errors.description = "Please tell us a bit about your Stream"
        }
    
        return errors;
    }

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
        const { 
            initialValues,
            formTitle,
            fieldTitle,
            fieldDescription,
            buttonText,
            handleOnSubmit, // passed from parent component
        } = this.props;

        return (
            <Form 
                initialValues={initialValues}
                validate={this.validate}
                onSubmit={handleOnSubmit}
                className="ui form error"
            >
                {({ handleSubmit }) => ( // from react-final form, calls event.preventDefault()
                    <form onSubmit={handleSubmit}>
                        <h1>{formTitle}</h1>
                        <Field name="title" component={this.renderInput} label={fieldTitle}/>
                        <Field name="description" component={this.renderInput} label={fieldDescription} />
                        <button className="ui button large inverted red">{buttonText}</button>
                    </form>
                )}
            </Form>
        );
    }
}

export default StreamForm;