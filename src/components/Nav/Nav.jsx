import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
//import './Nav.css';
import { useSelector } from 'react-redux';
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';

function Navigation() {
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
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/home" to="home">Cache Box</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll
        >
          {user.id === null && <Nav.Link href="/#/login">Login / Register</Nav.Link>}
          {user.id && <><Nav.Link href="/#/user">Home</Nav.Link>
        <Nav.Link href="/#/about">About</Nav.Link>
        <Nav.Link href="/#/info">Info Page</Nav.Link>
        <Nav.Link href="/#/gallery" >Gallery</Nav.Link></>}
      </Nav>
      {user.id && <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="mr-2"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>}
        {user.id && <LogOutButton className="navLink" />}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;

