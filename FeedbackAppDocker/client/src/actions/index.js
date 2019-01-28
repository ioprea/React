import axios from 'axios';
import {
    FETCH_USER, FETCH_SURVEYS
} from './types';

export const fetchUser = () => dispatch => {
    axios.get('/api/currentUser')
        .then(res => {
            dispatch({
                type: FETCH_USER,
                payload: res.data
            });
        })
}

export const handleToken = (token) => dispatch => {
    axios.post('/api/stripe', token)
        .then(res => {
            dispatch({
                type: FETCH_USER,
                payload: res.data
            });
        })
}

export const createSurvey = (values, history) => async dispatch => {
    const res = await axios.post('/api/surveys', values);
    history.push('/surveys');
    dispatch({type:FETCH_USER, payload: res.data});
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch({type: FETCH_SURVEYS, payload: res.data});
}
