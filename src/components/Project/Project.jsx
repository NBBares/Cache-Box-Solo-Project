import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EditForms from '../EditForms/EditForms';

function ProjectPage() {
    let params = useParams();
    console.log(params);

    let { projectId } = params;
    const dispatch = useDispatch();
    //grabs the information from the store
    const [inputImage, setInputImage] = useState({ image_name: '', image_description: '', project_id: projectId });
    let allprojects = useSelector(store => store.projectReducer);
    console.log('THIS IS ALL PROJECTS:', allprojects)
    const history = useHistory();


    let project = allprojects.find(project => {
        console.log("trying to find a project", project, projectId)
        return project.project_id === Number(projectId);
    });
    console.log('Found this project:', project);


    //calls in history to change pages
    const pageChange = () => {
        history.push('/gallery');
    }

    function deleteProject() {
        dispatch({
            type: 'DELETE_PROJECT',
            payload: projectId
        });
        history.push('/gallery');
    };

    function deleteImage(item) {
        dispatch({
            type: 'DELETE_IMAGE',
            payload: item.id
        })
    };

    const onSubmit = (event) => {
        console.log("New image is,", inputImage);
        //prevent form from submitting early
        event.preventDefault();

        //calls the add Project saga and sends the information through the index
        dispatch({
            type: 'ADD_TO_IMAGES',
            payload:
                inputImage
        });
        setInputImage({image_name: '', image_description: '', project_id: projectId });
        dispatch({
            type: 'FETCH_PROJECT',
        });
    };
    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_PROJECT' };
        dispatch(action);
    }, []);
    if (!project) {
        return <h2>Invalid Project ID</h2>
    }

    return (
        <>
            <div className="project">
                <h2>{project?.title}</h2>
                <h3>{project?.project_description}</h3>
                <p>Images:
                    <ul>{(project?.images.map((images, i) => {
                        return <li key={i} data={images?.id}><img className="descimg" src={images?.image_name} />{images?.image_description}
                            <button onClick={() => deleteImage(images)}>Delete</button>
                        </li>
                    }))}</ul>
                </p>
                <p>Tags:
                    <ul>{(project?.tags.map((tags, i) => {
                        return <li key={i} data={tags?.id}>{tags?.tag_name}</li>
                    }))}</ul>
                </p>
                <form onSubmit={onSubmit}>
                    <input onChange={(event) => setInputImage({ ...inputImage, image_name: event.target.value })} type="text" placeholder="Add an image url!" value={inputImage.image_name}></input>
                    <input onChange={(event) => setInputImage({ ...inputImage, image_description: event.target.value })} type="text" placeholder="Add a description!" value={inputImage.name_description}></input>
                    <button type="submit" value="Submit">Cache Image</button>
                </form>
                <button onClick={() => deleteProject()}>Delete</button>
                <button onClick={pageChange}>Return</button>
                <EditForms />
            </div>
        </>
    )
}

export default ProjectPage;