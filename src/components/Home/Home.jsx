import React, { useEffect, useState } from "react";
import { NoteForm } from "./NoteForm";
import { useAuth } from "../../context/authContext";

import {
  watchNotes,
  deleteNote,
  watchNotesDos,
  updateNote,
} from "../../context/noteFirestore";

export const Home = (props) => {
  console.log("hola estamos en Home");

  const [notes, setNotes] = useState([]);

  const [disableBtn, setDisableBtn] = useState(true); // este estado me permite controlar el atributo disable de input y textarea

  const { user, logout, loading } = useAuth();

 // const getNotes = async () => {   /* esta funcion no se usa ya no lo compartiendo como props */
  /* console.log(user);
    await watchNotes().then((response) => {
      console.log(response);
      setNotes(response);
    });
  }; */

  //funcion para editar  y actualizar las notas
    const updateNotes = (note) => {
    updateNote(note.id, note)
    setDisableBtn(true);
  }

  useEffect(() => {
    console.log("useEffect");
    watchNotesDos(setNotes, user); //actualizando con el useStade "setNotes" pasandolo como un callback para ello usando la funcion watchNotesDos q tiene onSnapshot
    console.log("hola");
    console.log("Home", user);
  }, []);

  //funcion eliminar notas
  const removeNote = async (id) => {
    console.log(id);
    await deleteNote(id);
    /* getNotes(); */ //llamndo a una funcion para q actualize el interfaz
    /* return props.removeNote */
  };

  //variable para almacena la funcion q esta en onChange y asi pueda traer los valores del input post-title y pos-description
  const handleFormChange = (index, ev) => {
    let data = [...notes]; //rellenar informacion o trayendo inform de mi ob notes ahora en esta variable
    data[index][ev.target.name] = ev.target.value;
    setNotes(data);
  };


  return (
    <div>
      <div>
        <NoteForm /* getNotes={getNotes} */ />
        {/* compartiendo con el hijo un props  getNotes*/}
      </div>
      <div className="container-post-notes">
        <div className="post-Notes">
          {notes.map((note, index) => (
            <div key={note.id} className="card mb-1 p-2">
              <div className="card body">
                <div className="container-post-title">
                  <input
                    name="title"
                    className="post-title"
                    value={note.title}
                    onChange={(ev) => handleFormChange(index, ev)}
                    disabled={disableBtn}//atributo disable con la funciòn q la actualizar el valor actual q comienza en true
                  ></input>
                </div>
                <div>
                  <textarea
                    name="description"
                    className="post-description"
                    value={note.description}
                    onChange={(ev) => handleFormChange(index, ev)}
                    disabled={disableBtn}
                  ></textarea>
                </div>
              </div>
              <div className="container-btn-date">
                <div className="post-date">
                  <p id="date">Fecha: {note.timeStamp.toDate().toLocaleString()}</p> {/* metodo de TimeStamp lovielve date y luego string */}
                </div>
                <button onClick={() => setDisableBtn(false)} className="btn-edit">  {/* aqui el atributo disable permite q se puede escribir en input y textarea por eso esta en false */}
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
                <button onClick={() => updateNotes(note)}  className="refresh">
                <i className="fa-solid fa-arrows-rotate" />
                </button>
                <button onClick={() => removeNote(note.id)} data-testid="delete-note">
                  <i className="fa-solid fa-trash-can "></i> {/* esto es para q se me mueva el icono */}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
