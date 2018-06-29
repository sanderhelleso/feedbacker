// SurveyField contaisn logic to render a signle label and textfield
import React from 'react';

export default ({ input }) => {
    return(
        <div>
            <input {...input} />
        </div>
    );
}

