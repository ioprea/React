import { connect } from 'react-redux';
import React, { Component } from 'react';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderSurveys() {
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card grey lighten-4" key={survey._id}>
                    <div className="card-content">
                        <span className="card-title">
                            {survey.title}
                        </span>
                        <p> {survey.body} </p>
                        <p className="right">Sent On: {new Date(survey.dateSent).toLocaleDateString()}</p>
                    </div>
                    <div className="card-action">
                        <a className="blue-text">Yes: {survey.yes}</a>
                        <a className="blue-text">No: {survey.yes}</a>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (<div>{this.renderSurveys()}</div>)
    }
}

export default connect(({ surveys }) => {
    return { surveys }
}, { fetchSurveys })(SurveyList)