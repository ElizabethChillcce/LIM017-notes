/* import './App.css'; */
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  deleteNote,
  watchNotesDos,
  /* getNoteById, */
  updateNote,
} from "./context/noteFirestore";


import { Welcome } from '../src/components/Welcome/Welcome';
import { Register } from '../src/components/Register/Register';
import { Login } from '../src/components/Login/Login';
import { Home } from '../src/components/Home/Home';
import { AuthProvider } from '../src/context/authContext';
import { ProtectedRoute } from './components/Protected/ProtectedRoute';

function App() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    watchNotesDos(setNotes); //actualizando con el useStade "setNotes" pasandolo como un callback para ello usando la funcion watchNotesDos q tiene onSnapshot
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

        <Route path="/" element={<Welcome/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home
                notes={notes}
                setNotes={setNotes}
                deleteNote={deleteNote}
                updateNote={updateNote}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      </BrowserRouter>
      </AuthProvider>
    );
  }

export default App;
