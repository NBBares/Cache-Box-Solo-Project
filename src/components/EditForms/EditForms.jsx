import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

function EditForms() {

    let params = useParams();
    console.log(params);

    let { projectId } = params;
    const dispatch = useDispatch();

    let allprojects = useSelector(store => store.projectReducer);

    let project = allprojects.find(project => {
        console.log("trying to find a project", project, projectId)
        return project.project_id === Number(projectId);
    });
    console.log('Found this project:', project);

    if (!project) {
        return <h2>Invalid Project ID</h2>
    }

    const [inputProjectEdit, setInputProjectEdit] = useState({ id: projectId, title: project.title, project_description: project.project_description });
    console.log('THIS IS ALL PROJECTS:', allprojects)


    const onSubmitProject = (event) => {
        console.log("Project edit is,", inputProjectEdit);
        //prevent form from submitting early
        event.preventDefault();

        //calls the add Project saga and sends the information through the index
        dispatch({
            type: 'EDIT_PROJECT',
            payload:
                inputProjectEdit
        });
        setInputProjectEdit('');
    }

    return (
        <>
            <div>
            <form onSubmit={onSubmitProject}>
                <input onChange={(event) => setInputProjectEdit({ ...inputProjectEdit, id: projectId, title: event.target.value })} type="text" placeholder="Edit your title!" value={inputProjectEdit.title}></input>
                <input onChange={(event) => setInputProjectEdit({ ...inputProjectEdit, project_description: event.target.value })} type="text" placeholder="Edit the description!" value={inputProjectEdit.project_description}></input>
                <Button variant="outline-primary" type="submit" value="Submit">Submit Changes</Button>
            </form>
            </div>
        </>
    )
}


export default EditForms;