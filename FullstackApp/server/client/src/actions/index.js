import axios from 'axios';
import {
    FETCH_USER
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
