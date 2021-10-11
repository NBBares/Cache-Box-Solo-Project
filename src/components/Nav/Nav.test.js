// src/components/Nav/Nav.test.jsx

import React from 'react';
import { Provider } from 'react-redux';
import {HashRouter as Router} from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Nav from './Nav';

import store from '../../redux/store';

describe('the navigation component', () => {
  it('should render a specific string, "Cache Box"', () => {
    render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    expect(screen.getByText('Cache Box')).toBeInTheDocument();
  });

  it('should render a different things when the user is logged in versus not logged in', () => {
    store.dispatch({ type: 'SET_USER', payload: { id: 1 } });
    render(
      <Provider store={store}>
        <Router>
          <Nav />
        </Router>
      </Provider>
    );
    expect(screen.queryByText('Home')).toBeInTheDocument();

    store.dispatch({ type: 'UNSET_USER' });
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
  });
});
