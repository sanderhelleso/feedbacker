// SurveyField contaisn logic to render a signle label and textfield
import React from 'react';

export default ({ input, label }) => {
    return(
        <div>
            <label>{label}</label>
            <input {...input} />
        </div>
    );
}

