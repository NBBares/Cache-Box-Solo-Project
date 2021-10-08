import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../UserPage/UserPage.css";

import { useScript } from "../../hooks/useScript";

function UserPage() {
  const dispatch = useDispatch();
  //inputs for the form that create a single object for the database to accept
  const [inputProject, setInputProject] = useState({ title: '', project_description: '', type_id: 1, image_name: '', image_description: '', tag_name: '' });
  // const [inputTag, setInputTag] = useState({tag_name:''});
  const history = useHistory();
  const tags = useSelector((store) => store.tagsReducer);

  //form logic
  const onSubmit = (event) => {
    console.log("Project inputs are,", inputProject);
    //prevent form from submitting early
    event.preventDefault();

    //calls the add Project saga and sends the information through the index
    dispatch({
      type: 'ADD_TO_PROJECTS',
      payload:
        inputProject

    });

    setInputProject('');

    //to send to home page
    history.push('/gallery');
  }

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
          setInputProject({ ...inputProject, image_name: result.info.secure_url })
        }
      },
    ).open();
  }

  //to send to home page
  const pageChange = () => {
    history.push('/gallery')
  }

  useEffect(() => {
    console.log('in useEffect');
    const action = { type: 'FETCH_TAG' };
    dispatch(action);
  }, []);

  return (
    <>
    <Row  xs={1} md={1} className="g-4"></Row>
      <h2 className="header1">Create a new project:</h2>
      <div className="formPrimary">
        {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}
        <Form className="projectForm" onSubmit={onSubmit}>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Title:
            </Form.Label>
            <Col sm={10}>
              <Form.Control required className="input" onChange={(event) => setInputProject({ ...inputProject, title: event.target.value })} type="title" placeholder="Title" value={inputProject.title} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalProjectDescription">
            <Form.Label column sm={2}>
              Project Description:
            </Form.Label>
            <Col sm={10}>
              <Form.Control required className="input" onChange={(event) => setInputProject({ ...inputProject, project_description: event.target.value })} type="text" placeholder="Description" value={inputProject.description} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalImageSubmit">
            <Form.Label as="legend" column sm={2}>
              Upload Image:
            </Form.Label>
            <Col sm={10}>
              <Button type="button" variant="outline-light" size="sm" onClick={openWidget}>Pick File</Button>
              {inputProject.image_name && <p>Uploaded Image URL: {inputProject.image_name} <br /><img src={inputProject.image_name} width={100} /></p>}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalImageDescription">
            <Form.Label column sm={2}>
              Image Description:
            </Form.Label>
            <Col sm={10}>
              <Form.Control className="input" onChange={(event) => setInputProject({ ...inputProject, image_description: event.target.value })} type="text" placeholder="Description" value={inputProject.name_description} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalType">
            <Form.Label column sm={2}>
              Project Type:
            </Form.Label>
            <Col sm={10}>
            <Form.Select required className="input" type="text" placeholder="Type" onChange={(event) => setInputProject({ ...inputProject, type_id: event.target.value })} value={inputProject.type_id}>
                <option value={"1"}>Physical Art</option>
                <option value={"2"}>Digital Art</option>
                <option value={"3"}>To Do</option>
                <option value={"4"}>Coding</option>
                <option value={"5"}>Crafts</option>
                <option value={"6"}>Wood Working</option>
                <option value={"7"}>Gardening</option>
              </Form.Select>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalTag">
            <Form.Label column sm={2}>
              Tag:
            </Form.Label>
            <Col sm={10}>
              <Form.Control required className="input" onChange={(event) => setInputProject({ ...inputProject, tag_name: event.target.value })} type="text" placeholder="Tag" value={inputProject.tag_name} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ span: 10, offset: 2 }}>
              <Button className="first" variant="outline-light" type="submit" value="Submit">Cache Project</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    </>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;

{/* <Form>
  <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
    <Form.Label column sm={2}>
      Title
    </Form.Label>
    <Col sm={10}>
      <Form.Control onChange={(event) => setInputProject({ ...inputProject, title: event.target.value })} type="title" placeholder="Title" value={inputProject.title}/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formHorizontalProjectDescription">
    <Form.Label column sm={2}>
      Project Description
    </Form.Label>
    <Col sm={10}>
      <Form.Control onChange={(event) => setInputProject({ ...inputProject, project_description: event.target.value })} type="text" placeholder="Description" value={inputProject.description}/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formHorizontalImageSubmit">
    <Form.Label as="legend" column sm={2}>
      Upload Image
    </Form.Label>
    <Col sm={10}>
      <Button type="button" variant="secondary" size="sm" onClick={openWidget}>Pick File</Button>
      {inputProject.image_name && <p>Uploaded Image URL: {inputProject.image_name} <br /><img src={inputProject.image_name} width={100} /></p>}
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formHorizontalImageDescription">
    <Form.Label column sm={2}>
      Image Description
    </Form.Label>
    <Col sm={10}>
      <Form.Control onChange={(event) => setInputProject({ ...inputProject, image_description: event.target.value })} type="text" placeholder="Description" value={inputProject.name_description}/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formHorizontalType">
    <Form.Label column sm={2}>
      Project Type
    </Form.Label>
    <Col sm={10}>
      <Form.Select type="text" placeholder="Type" onChange={(event) => setInputProject({ ...inputProject, type_id: event.target.value })} value={inputProject.type_id}>
      <option value={"1"}>Physical Art</option>
            <option value={"2"}>Digital Art</option>
            <option value={"3"}>To Do</option>
            <option value={"4"}>Coding</option>
            <option value={"5"}>Crafts</option>
            <option value={"6"}>Wood Working</option>
            <option value={"7"}>Gardening</option>
      </Form.Select>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3" controlId="formHorizontalTag">
    <Form.Label column sm={2}>
      Tag
    </Form.Label>
    <Col sm={10}>
      <Form.Control onChange={(event) => setInputProject({ ...inputProject, tag_name: event.target.value })} type="text" placeholder="Tag" value={inputProject.tag_name}/>
    </Col>
  </Form.Group>

  <Form.Group as={Row} className="mb-3">
    <Col sm={{ span: 10, offset: 2 }}>
    <Button variant="outline-primary" type="submit" value="Submit">Cache Project</Button>
    </Col>
  </Form.Group>
</Form> */}

// {/* <h2>Feel free to add your own Projects!</h2>
// <div>
//   <Form onSubmit={onSubmit}>
//     <input onChange={(event) => setInputProject({ ...inputProject, title: event.target.value })} type="text" placeholder="Enter a Project Title!" value={inputProject.title}></input>
//     <input onChange={(event) => setInputProject({ ...inputProject, project_description: event.target.value })} type="text" placeholder="Add a description!" value={inputProject.description}></input>

//     <h4>Upload New File</h4>
//     File to upload: <Button type="button" variant="secondary" size="sm" onClick={openWidget}>Pick File</Button>
//     <br />
//     {inputProject.image_name && <p>Uploaded Image URL: {inputProject.image_name} <br /><img src={inputProject.image_name} width={100} /></p>}
//     <br />
//     {/* <input onChange={(event)=> setInputProject({...inputProject, image_name: event.target.value})} type="text" placeholder="Add an image url!" value={inputProject.image_name}></input> */}
//     <input onChange={(event) => setInputProject({ ...inputProject, image_description: event.target.value })} type="text" placeholder="Add a description!" value={inputProject.name_description}></input>
//     <select onChange={(event) => setInputProject({ ...inputProject, type_id: event.target.value })} value={inputProject.type_id}>
//       <option value={"1"}>Physical Art</option>
//       <option value={"2"}>Digital Art</option>
//       <option value={"3"}>To Do</option>
//       <option value={"4"}>Coding</option>
//       <option value={"5"}>Crafts</option>
//       <option value={"6"}>Wood Working</option>
//       <option value={"7"}>Gardening</option>
//     </select>
//     <input onChange={(event) => setInputProject({ ...inputProject, tag_name: event.target.value })} type="text" placeholder="Enter a Project Tag!" value={inputProject.tag_name}></input>

//     <Button variant="outline-primary" type="submit" value="Submit">Cache Project</Button>

//   </Form> */}