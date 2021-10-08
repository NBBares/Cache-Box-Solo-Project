import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LandingPage.css';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';

function LandingPage() {
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
    <Row  xs={1} md={1} className="g-4"></Row>
    <div className="container">
      <h2>{heading}</h2>
      <h5>Welcome to Cache Box. This is a place for you to organize your personal projects. By creating an account a user can create a secure place online to track their projects. This allows for easy access to all of your current projects for quick reference for yourself or if you want to show off what you are working on!</h5>

      <div className="grid">
        <div className="grid-col grid-col_8">
          <p></p>
        </div>
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4 className="member">Already a Member?</h4>
            <Button variant="outline-light" className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </Button>
          </center>
        </div>
      </div>
    </div>
    </>
  );
}

export default LandingPage;
