import {
    put,
    takeLatest
} from 'redux-saga/effects';
import axios from 'axios';

// saga to ADD/POST a new image
function* addimage(action) {
    try {

        // passes all image info from the server to the payload 
        yield axios.post('/api/user/postimage', action.payload);

        // automatically log image
        yield put({
            type: 'FETCH_PROJECT'
        });

    } catch (error) {
        console.log('Error with posting image:', error);
    }
}

// saga to DELETE a image
function* deleteimage(action) {
    console.log("IN MY DELETE SAGA MY PAYLOAD IS:", action.payload)
    try {
        // passes all images from the server to the payload 
        yield axios.delete(`/api/user/image/${action.payload}`);

        // automatically log image
        yield put({
            type: 'FETCH_PROJECT'
        });

    } catch (error) {
        console.log('Error with delete image:', error);
    }
}

//saga to EDIT/PUT a image
function* editimage(action) {
    try {

        // passes all images from the server to the payload 
        yield axios.put(`/api/user/editImage/${action.payload.id}`, action.payload); //????

        // automatically log images
        yield put({
            type: 'FETCH_PROJECT',
        });

    } catch (error) {
        console.log('Error with editing image:', error);
    }
}

function* imageSaga() {
    yield takeLatest('ADD_TO_IMAGES', addimage);
    yield takeLatest('DELETE_IMAGE', deleteimage);
    yield takeLatest('EDIT_IMAGE', editimage)
}

export default imageSaga;