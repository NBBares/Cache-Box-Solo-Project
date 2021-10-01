import {
    put,
    takeLatest
} from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "project" actions to load projects
function* fetchProject(action) {
    try {

        // passes all projects from the server to the payload 
        const response = yield axios.get('/api/user/project');

        // automatically log projects
        yield put({
            type: 'SET_PROJECTS',
            payload: response.data
        });

    } catch (error) {
        console.log('Error with projects:', error);
    }
}

// saga to ADD/POST a new project
function* addProject(action) {
    try {

        // passes all project info from the server to the payload 
        yield axios.post('/api/user/post', action.payload);

        // automatically log project
        yield put({
            type: 'FETCH_PROJECT'
        });

    } catch (error) {
        console.log('Error with posting project:', error);
    }
}

// saga to DELETE a project
function* deleteProject(action) {
    try {

        // passes all projects from the server to the payload 
        yield axios.delete(`/api/user/project/${action.payload}`);

        // automatically log project
        yield put({
            type: 'FETCH_PROJECT'
        });

    } catch (error) {
        console.log('Error with delete project:', error);
    }
}

//saga to EDIT/PUT a project
function* editProject(action) {
    try {
        console.log("ACTIONPAYLOAD IS", action.payload)
        // passes all projects from the server to the payload 
        yield axios.put(`/api/user/editProject/${action.payload.id}`, action.payload);//????

        // automatically log projects
        yield put({
            type: 'FETCH_PROJECT',
        });

    } catch (error) {
        console.log('Error with editing project:', error);
    }

}

function* projectSaga() {
    yield takeLatest('FETCH_PROJECT', fetchProject);
    yield takeLatest('ADD_TO_PROJECTS', addProject);
    yield takeLatest('DELETE_PROJECT', deleteProject);
    yield takeLatest('EDIT_PROJECT', editProject)
}




export default projectSaga;