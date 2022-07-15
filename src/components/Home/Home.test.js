import React from 'react'
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'
import {Home} from './Home';
import { AuthProvider } from '../../context/authContext.js';

jest.mock("../../context/authContext.js")

describe.only("prueba del Home", () => {

  let notes
  let setNotes
  let deleteNote
  let updateNote

  beforeEach(() => {
    notes = [
      {
        autor: "eli.chillcce.08@gmail.com",
        description: "Lab Notes red social card",
        id: "1X6k9J5v68b4xOq9Ub7p",
        timeStamp: {
          toDate() {
            return {
              toLocaleString: () => "2020-01-01",
            }
          }
        },
        title: "Proyecto lab",
      },
    ];

    setNotes = jest.fn()

    deleteNote = jest.fn();

    updateNote = jest.fn();

  })

  test('eliminar notas', async () => {
      const history = createMemoryHistory();
      render(
        <AuthProvider>
          <Router location={history.location} navigator={history}>
            <Home
              notes={notes}
              setNotes={setNotes}
              deleteNote={deleteNote}
              updateNote={updateNote}
            />
          </Router>
        </AuthProvider>
      );
      const linkElement = screen.getByTestId("delete-note");
      expect(linkElement).toBeInTheDocument();
      await userEvent.click(linkElement);
      expect(deleteNote).toBeCalledTimes(1);
    });
  })
