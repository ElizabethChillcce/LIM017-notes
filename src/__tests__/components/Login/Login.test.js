import React from 'react'
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import {Login} from '../../../components/Login/Login';
import { AuthProvider } from '../../../context/authContext.js';

jest.mock("../../../context/authContext.js")

test('renders YUYARINAPAQ', () => {
  const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router location={history.location} navigator={history}>
        <Login />
        </Router>
      </AuthProvider>
    );
    const linkElement = screen.getByText(/YUYARINAPAQ/i);
    expect(linkElement).toBeInTheDocument();
  });


  test('Login Component', async () => {
    const history = createMemoryHistory();
    render(
      <AuthProvider>
        <Router location={history.location} navigator={history}>
        <Login />
        </Router>
      </AuthProvider>
     );
    const emailInput =  screen.getByTestId('createEmail');
    const passwordInput =  screen.getByTestId('createPassword');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  })