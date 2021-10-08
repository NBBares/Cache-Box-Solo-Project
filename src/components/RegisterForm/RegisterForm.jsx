import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../RegisterForm/RegisterForm.css';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
        email: email,
      },
    });
  }; // end registerUser

  return (
    <>
    <Row  xs={1} md={1} className="g-4"></Row>
    <div className="formPrimary">
      <Form className="formPanel" onSubmit={registerUser}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
          <Form.Label column sm={4}>
            Username:
          </Form.Label>
          <Col sm={{ span: 10, offset: 1 }}>
            <Form.Control type="text"
             name="username"
             className="username"
             value={username}
             required 
             onChange={(event) => setUsername(event.target.value)}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalProjectDescription">
          <Form.Label column sm={4}>
            Password:
          </Form.Label>
          <Col sm={{ span: 10, offset: 1 }}>
            <Form.Control className="input" type="password"
          name="password"
          value={password}
          className="password"
          required
          onChange={(event) => setPassword(event.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalImageDescription">
          <Form.Label column sm={4}>
            Email:
          </Form.Label>
          <Col sm={{ span: 10, offset: 1 }}>
            <Form.Control className="input" type="email"
          name="email"
          value={email}
          className="email"
          required
          onChange={(event) => setEmail(event.target.value)} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 1 }}>
            <Button className="btn" variant="outline-light" type="submit" name="submit" value="Register">Resgister</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
    </>
  );
}

export default RegisterForm;

