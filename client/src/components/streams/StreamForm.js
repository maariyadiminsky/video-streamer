import React from "react";
import { Field, Form } from "react-final-form";

const StreamForm = ({ 
    initialValues,
    formTitle,
    fieldTitle,
    fieldDescription,
    buttonText,
    handleOnSubmit, // passed from parent component
    parentErrors,
}) => {
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

    const renderInputError = (error) => (
        <div className="ui error tiny message">
            <span className="header">{error}</span>
        </div>
    );
    
    const renderInput = ({ label, input, meta: { touched, submitFailed, error }}) => {
        let hasBeenTouchedAndHasError = (touched || submitFailed) && error;

        return (
            <div className={`field ${hasBeenTouchedAndHasError && "error"}`}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {hasBeenTouchedAndHasError && renderInputError(error)}
            </div>
        );
    }

    return (
        <Form 
            initialValues={initialValues}
            validate={validate}
            onSubmit={handleOnSubmit}
            className="ui form error"
        >
            {({ handleSubmit }) => ( // from react-final form, calls event.preventDefault()
                <form onSubmit={handleSubmit} className="ui form error">
                    <h1>{formTitle}</h1>
                    <div className="ui error tiny message">{parentErrors}</div>
                    <Field name="title" component={renderInput} label={fieldTitle}/>
                    <Field name="description" component={renderInput} label={fieldDescription} />
                    <button className="ui button large inverted red">{buttonText}</button>
                </form>
            )}
        </Form>
    );
}

export default StreamForm;