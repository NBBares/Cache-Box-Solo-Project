import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Button, Navbar, Nav, Form, FormControl, Image } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import '../Nav/Nav.css';

function Navigation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((store) => store.user);
  let searchTerm = useSelector(store => store.galleryReducer);//grabs search term

  const onSubmit = (event) => {
    //prevent form from submitting early
    event.preventDefault();

    

    //to send to gallery results page
    history.push('/gallery');
  }

  return (
    <div className="navHead">
    <Navbar class= "navHeader" expand="lg">
      <Image style={{maxHeight: '50px', maxWidth: '50px' }} src="../Images/Chest-icon.png" />
      <Navbar.Brand href="/home" to="home">Cache Box</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav 
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: '150px' }}
          navbarScroll
        >
          {user.id === null && <Nav.Link href="/#/login">Login / Register</Nav.Link>}
          {user.id && <><Nav.Link href="/#/user">Home</Nav.Link>
        <Nav.Link href="/#/about">About</Nav.Link>
        <Nav.Link href="/#/info">Info Page</Nav.Link>
        <Nav.Link href="/#/gallery" >Gallery</Nav.Link></>}
      </Nav>
      {user.id && <Form onSubmit={onSubmit} className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
            onChange={(event) => dispatch({
              type: 'SET_GALLERY',
              payload: event.target.value
            })} type="title" placeholder="Search" value={searchTerm}
          />
          <Button variant="outline-secondary" type="submit" value="Submit">Search</Button>
        </Form>}
        {user.id && <LogOutButton className="navLink" />}
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
}

export default Navigation;

