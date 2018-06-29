// SurveyField contains logic to render a signle label and textfield
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
    return(
        <div>
            <label>{label}</label>
            <input {...input} />
            {touched && error} 
        </div>
    );
}

