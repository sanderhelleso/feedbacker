// SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from 'react';
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import surveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

const FIELDS = [
    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email Body", name: "body" },
    { label: "Recipient List", name: "emails" }
];

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return <Field key={name} component={surveyField} type="text" label={label} name={name} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <button className="teal btn right white-text" type="submit">Next<i className="material-icons right">done</i></button>
                    <Link className="red btn white-text" to="/surveys">
                        Cancel
                    </Link>
                </form>
            </div>
        );
    }
}

// form validation
function validate(values) {
    const errors = {};

    // check email list
    errors.emails  = validateEmails(values.emails || "");

    // error checking
    _.each(FIELDS, ({ name }) => {
        if (!values[name]) {
            errors[name] = "You must provide a value";
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: "surveyForm"
})(SurveyForm);