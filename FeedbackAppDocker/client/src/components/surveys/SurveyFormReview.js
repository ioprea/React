import React from 'react';
import { connect } from 'react-redux';
import { FIELDS } from './SurveyForm';
import * as actions from '../../actions';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = ({onCancel, formValues, createSurvey, history}) => {
    const reviewFields = FIELDS.map(({ name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>
                    {formValues[name]}
                </div>
            </div>
        );
    })

    return (
        <div>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="btn-flat yellow darken-3" onClick={onCancel}>
                Back
            </button>
            <button 
                className="btn-flat green darken-3 right" 
                onClick={() => createSurvey(formValues, history)}
            >
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

export default connect(store => {
    return {
        formValues: store.form.surveyForm.values
    }
}, actions)(withRouter(SurveyFormReview));