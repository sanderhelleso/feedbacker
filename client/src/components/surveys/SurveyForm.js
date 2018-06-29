// SurveyForm shows a form for a user to add input
import _ from "lodash";
import React, { Component } from 'react'
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import surveyField from "./SurveyField";

const FIELDS = [
    { label: "Survey Title", name: "title" },
    { label: "Subject Line", name: "subject" },
    { label: "Email Body", name: "body" },
    { label: "Recipient List", name: "emails" }
]

class SurveyForm extends Component {
    renderFields() {
        return _.map(FIELDS, ({ label, name }) => {
            return <Field key={name} component={surveyField} type="text" label={label} name={name} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
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

export default reduxForm({
    form: "surveyForm"
})(SurveyForm);