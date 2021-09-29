import {
    put,
    takeLatest
} from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "tag" actions to load tags
function* fetchtag(action) {
    try {

        // passes all tags from the server to the payload 
        const response = yield axios.get('/api/user/tags');

        // automatically log tags
        yield put({
            type: 'SET_TAGS',
            payload: response.data
        });

    } catch (error) {
        console.log('Error with tags:', error);
    }
}

// saga to ADD/POST a new tag
function* addtag(action) {
    try {

        // passes all tag info from the server to the payload 
        yield axios.post('/api/user/posttag', action.payload);

        // automatically log tag
        yield put({
            type: 'FETCH_TAG'
        });

    } catch (error) {
        console.log('Error with posting tag:', error);
    }
}

function* tagSaga() {
    yield takeLatest('FETCH_TAG', fetchtag);
    yield takeLatest('ADD_TO_TAGS', addtag);
}

export default tagSaga;