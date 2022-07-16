import React from 'react'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import {Home} from './Home';
import {deleteNote} from '../../context/noteFirestore'
import { AuthProvider } from '../../context/authContext.js';

jest.mock("../../context/authContext.js")
jest.mock("../../context/noteFirestore.js")

describe.only("prueba del Home", () => {
    test('eliminar notas', () => {
        const history = createMemoryHistory();
        render(
          <AuthProvider>
            <Router location={history.location} navigator={history}>
            <Home />
            </Router>
          </AuthProvider>
        );
        const linkElement = screen.getByTestId("delete-note");
        expect(linkElement).toBeInTheDocument();
        userEvent.click(linkElement);
        expect(deleteNote).toHaveBeenCalled();
      });
    })
