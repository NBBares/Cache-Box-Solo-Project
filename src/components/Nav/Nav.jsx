import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
//import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  let projectData = useSelector(store => store.projectReducer);

  const onSubmit = (event) => {
    console.log("Project inputs are,", inputProject);
    //prevent form from submitting early
    event.preventDefault();
    
    //calls the add Project saga and sends the information through the index
    dispatch({
        type: 'FETCH_PROJECT'
    });

    //to send to gallery results page
    history.push('/gallery');
}




  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

          
            <select placeholder="Project Type">
                                <option selected hidden>Project Type</option>
                                <option value={"1"}>Physical Art</option>
                                <option value={"2"}>Digital Art</option>
                                <option value={"3"}>To Do</option>
                                <option value={"4"}>Coding</option>
                                <option value={"5"}>Crafts</option>
                                <option value={"6"}>Wood Working</option>
                                <option value={"7"}>Gardening</option>
          </select>
        

            <Link className="navLink" to="/info">
              Info Page
            </Link>
            
            <Link className="navLink" to="/gallery">
              Gallery
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;
