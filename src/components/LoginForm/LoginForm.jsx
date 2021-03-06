import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import "../LoginForm/LoginForm.css";
import Button from 'react-bootstrap/Button';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <div className="loginDiv">
    <form className="formPanel" onSubmit={login}>
      <h2>Login</h2>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <div className="user">
        <label htmlFor="username">
          Username:
          <div className="input">
          <input
            className="usern"
            type="text"
            name="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          </div>
        </label>
      </div>
      <div className="pass">
        <label htmlFor="password">
          Password:
          <div className="input">
          <input
            className="password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          </div>
        </label>
      </div>
      <div>
      <Button className="first" variant="outline-light" type="submit" value="Submit">Login</Button>
      </div>
    </form>
    </div>
  );
}

export default LoginForm;
