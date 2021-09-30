import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector, useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {
    const dispatch= useDispatch();
    //inputs for the form that create a single object for the database to accept
    const [inputProject, setInputProject] = useState({title:'', project_description:'', type_id:0, user_id:0, image_name:'', image_description:'' });
    const history = useHistory();

    //form logic
    const onSubmit = (event) => {
        console.log("Project inputs are,", inputProject);
        //prevent form from submitting early
        event.preventDefault();
        
        //calls the add Project saga and sends the information through the index
        dispatch({
            type: 'ADD_PROJECTS',
            payload: 
            inputProject

        })
         
        setInputProject('');

        //to send to home page
        history.push('/');
    }

    //to send to home page
    const pageChange = () => {
        history.push('/')
    }
    
    return(
        <>
        <h2>Feel free to add your own Projects!</h2>
        <form onSubmit={onSubmit}>
            <input onChange={(event)=> setInputProject({...inputProject, title: event.target.value})} type="text" placeholder="Enter a Project Title!" value={inputProject.title}></input>
            <input onChange={(event)=> setInputProject({...inputProject, poster: event.target.value})} type="text" placeholder="Enter the Project's Poster!" value={inputProject.poster}></input>
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
            <button type="submit" value="Submit">Cache Project</button>
        </form>
        <button onClick={(pageChange)}>Cancel</button>
        </>
    )
}

// this allows us to use <App /> in index.js
export default UserPage;
