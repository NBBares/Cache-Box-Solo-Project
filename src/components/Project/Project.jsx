import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EditForms from '../EditForms/EditForms';
import { useScript } from "../../hooks/useScript";
import { Button } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import '../Project/Project.css';
import Row from 'react-bootstrap/Row';

function ProjectPage() {
    const params = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    console.log(params);

    const { projectId } = params;
    //grabs the information from the store
    const [inputImage, setInputImage] = useState({ image_name: '', image_description: '', project_id: projectId });
    const [editState, setEditState] = useState(false);
    const [addState, setAddState] = useState(false);
    const allprojects = useSelector(store => store.projectReducer);
    console.log('THIS IS ALL PROJECTS:', allprojects)

    const project = allprojects.find(project => {
        console.log("trying to find a project", project, projectId)
        return project.project_id === Number(projectId);
    });
    console.log('Found this project:', project);

    const openWidget = () => {
        !!window.cloudinary && window.cloudinary.createUploadWidget(
            {
                sources: ['local', 'url', 'camera'],
                cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
                uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
            },
            (error, result) => {
                if (!error && result && result.event === "success") {
                    // When an upload is successful, save the uploaded URL to local state!
                    setInputImage({ ...inputImage, image_name: result.info.secure_url })
                }
            },
        ).open();
    }

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
        setInputImage({ image_name: '', image_description: '', project_id: projectId });
        dispatch({
            type: 'FETCH_PROJECT',
        });
        setAddState(!addState);
    };

    useEffect(() => {
        console.log('in useEffect');
        const action = { type: 'FETCH_PROJECT' };
        dispatch(action);
    }, []);

    // This sets up a fancy useEffect that mounts a script tag for the cloudinary library
    useScript('https://widget.cloudinary.com/v2.0/global/all.js')

    if (!project) {
        return <h2>Invalid Project ID</h2>
    }

    let editProject = (() => {
        console.log("EDIT STATE:", editState)
        setEditState(!editState);
        console.log("EDIT STATE:", editState)
    });

    let addStuff = (() => {
        console.log("ADD STATE:", addState)
        setAddState(!addState);
        console.log("ADD STATE:", addState)
    });

    return (
        <>
        <div className="container">
            <Row xs={1} md={1} className="g-4"></Row>
            <div className="project">
                <h1 className="title">{project?.title}</h1>
                <h4 className="projectDes">{project?.project_description}</h4>
                <div class="carouselDiv">
                    <Carousel class="carousel" >{(project?.images.map((images, i) => {
                        return (
                            <Carousel.Item interval='500000'>
                                <Image
                                    className="d-block w-100"
                                    // src="holder.js/800x400?text=First slide&bg=373940"
                                    src="holder.js/100px250" fluid
                                    alt="First slide"
                                    src={images?.image_name}
                                />
                                <Carousel.Caption>
                                    <p>{images?.image_description}</p>
                                <Button class="btn btn-primary pull-right" type="button" variant="secondary" size="sm" onClick={() => deleteImage(images)}>Delete</Button>
                                </Carousel.Caption>
                            </Carousel.Item>)
                    }))}
                    </Carousel>
                </div>
                <p>Tags:
                    <ul>{(project?.tags.map((tags, i) => {
                        return <li key={i} data={tags?.id}>{tags?.tag_name}</li>
                    }))}</ul>
                </p>
                <Button variant="secondary" size="sm" onClick={addStuff}>Add</Button>
                {addState && <form onSubmit={onSubmit}>
                    <h4>Upload New File</h4>
                    File to upload: 
                    <Button type="button" variant="secondary" onClick={openWidget}>Pick File</Button>
                    <br />
                    {inputImage.image_name && <p>Uploaded Image URL: {inputImage.image_name} <br /><img src={inputImage.image_name} width={100} /></p>}
                    <br />
                    <input onChange={(event) => setInputImage({ ...inputImage, image_description: event.target.value })} type="text" placeholder="Add a description!" value={inputImage.name_description}></input>
                    <Button variant="outline-primary" type="submit" value="Submit">Cache Image</Button>
                </form>}

                <Button variant="secondary" size="sm" onClick={editProject}>Edit</Button>
                {editState && <EditForms />}
                {editState && <Button size="sm" onClick={() => deleteProject()}>Delete</Button>}
                <br/>
                <Button onClick={pageChange}>Return</Button>
            </div>
          </div>  
        </>
    )
}

export default ProjectPage;


{/* <ul>{(project?.images.map((images, i) => {
                        return <li key={i} data={images?.id}><img className="descimg" src={images?.image_name} />{images?.image_description}
                            <Button type="button" variant="secondary" size="sm" onClick={() => deleteImage(images)}>Delete</Button>
                        </li>
                    }))}</ul> */}