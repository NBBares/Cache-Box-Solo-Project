import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

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
      <h2>Feel free to add your own Projects!</h2>
      <div>
        <Form onSubmit={onSubmit}>
          <input onChange={(event)=> setInputProject({...inputProject, title: event.target.value})} type="text" placeholder="Enter a Project Title!" value={inputProject.title}></input>
            <input onChange={(event)=> setInputProject({...inputProject, project_description: event.target.value})} type="text" placeholder="Add a description!" value={inputProject.description}></input>
            <input onChange={(event)=> setInputProject({...inputProject, image_name: event.target.value})} type="text" placeholder="Add an image url!" value={inputProject.image_name}></input>
            <input onChange={(event)=> setInputProject({...inputProject, image_description: event.target.value})} type="text" placeholder="Add a description!" value={inputProject.name_description}></input>
            <select onChange={(event) => setInputProject({...inputProject, type_id: event.target.value})} value={inputProject.type_id}>
                                <option value={"1"}>Physical Art</option>
                                <option value={"2"}>Digital Art</option>
                                <option value={"3"}>To Do</option>
                                <option value={"4"}>Coding</option>
                                <option value={"5"}>Crafts</option>
                                <option value={"6"}>Wood Working</option>
                                <option value={"7"}>Gardening</option>
            </select>
            <input onChange={(event)=> setInputProject({...inputProject, tag_name: event.target.value})} type="text" placeholder="Enter a Project Tag!" value={inputProject.tag_name}></input>
          <Button variant="outline-primary" type="submit" value="Submit">Cache Project</Button>

        </Form>
        <Button variant="outline-secondary" size="sm" onClick={(pageChange)}>Cancel</Button>
      </div>
    </>
  )
}

// this allows us to use <App /> in index.js
export default UserPage;


{/* <Row className="mb-3">
    <Form.Group as={Col} controlId="formGridTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" placeholder="Enter Title" value={inputProject.title} onChange={(event)=> setInputProject({...inputProject, title: event.target.value})}/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridProjectDescription">
      <Form.Label>Project Description</Form.Label>
      <Form.Control type="text" placeholder="Add a description" value={inputProject.description}   onChange={(event)=> setInputProject({...inputProject, project_description: event.target.value})}/>
    </Form.Group>
  </Row>

  <Form.Group className="mb-3" controlId="formGridImageUrl">
    <Form.Label>Image</Form.Label>
    <Form.Control type="text" placeholder="Add an image url" value={inputProject.image_name} onChange={(event)=> setInputProject({...inputProject, image_name: event.target.value})}/>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formGridImageDescription">
    <Form.Label>Image Description</Form.Label>
    <Form.Control type="text" placeholder="Add a description" value={inputProject.name_description} onChange={(event)=> setInputProject({...inputProject, image_description: event.target.value})}/>
  </Form.Group>

    <Form.Group as={Col} controlId="formGridType">
      <Form.Label>Type</Form.Label>
      <Form.Select onChange={(event) => setInputProject({...inputProject, type_id: event.target.value})} value={inputProject.type_id}>
        <option value={"1"}>Physical Art</option>
                                <option value={"2"}>Digital Art</option>
                                <option value={"3"}>To Do</option>
                                <option value={"4"}>Coding</option>
                                <option value={"5"}>Crafts</option>
                                <option value={"6"}>Wood Working</option>
                                <option value={"7"}>Gardening</option>
      </Form.Select>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridZip">
      <Form.Label>Zip</Form.Label>
      <Form.Control type="text" placeholder="Enter a Project Tag!" value={inputProject.tag_name} onChange={(event)=> setInputProject({...inputProject, tag_name: event.target.value})}/>
    </Form.Group>
  </Row>
 */}