import React, { useEffect, useState } from "react";
import { NoteForm } from "./NoteForm";

import {
  watchNotes,
  deleteNote,
  watchNotesDos,
  /* getNoteById, */
  updateNote,
} from "../../context/noteFirestore";

export const Home = (props) => {
  console.log("hola estamos en Home");

  const [notes, setNotes] = useState([]);

  /* const [disableBtn, setDisableBtn] = useState(false); */   // es de prueba

  const getNotes = async () => {   /* esta funcion no se usa ya no lo compartiendo como props */
    await watchNotes().then((response) => {
      console.log(response);
      setNotes(response);
    });
  };

  //funcion para editar las notas
  const editNote = (note) => {
    console.log(note);
    updateNote(note.id, note);
  };

  useEffect(() => {
    console.log("useEffect");
    watchNotesDos(setNotes); //actualizando con el useStade "setNotes" pasandolo como un callback para ello usando la funcion watchNotesDos q tiene onSnapshot
    console.log("hola");
  }, []);

  //funcion eliminar notas
  const removeNote = async (id) => {
    console.log(id);
    /* debugger; */
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

  /* const enableButton = () => {
    setDisableBtn(false);
  console.log("desabilitado")
  } */

  return (
    <div>
      <div>
        <NoteForm getNotes={getNotes} />
        {/* compartiendo con el hijo un props  getNotes*/}
      </div>
      <div className="container-post-notes">
        <div className="post-Notes">
          {notes.map((note, index) => (
            <div key={note.id} className="card mb-1 p-2">
              <div className="card body">
                <div className="container-post-title">
                  {/* <h4 className="post-title">{note.title}</h4>  */}
                  <input
                    name="title"
                    className="post-title"
                    value={note.title}
                    onChange={(ev) => handleFormChange(index, ev)}
                    /* disabled={true} */  //esto lo añadi de prueba para evitar q el usuario escriba antes de presionar el boton editar
                  ></input>
                </div>
                <div>
                  {/* <textarea className="post-description">{note.description}</textarea> */}
                  <textarea
                    name="description"
                    className="post-description"
                    value={note.description}
                    onChange={(ev) => handleFormChange(index, ev)}
                  ></textarea>
                </div>
              </div>
              <div className="container-btn-date">
                <div className="post-date">
                  <p id="date">Fecha: {note.timeStamp.toDate().toLocaleString()}</p> {/* metodo de TimeStamp lovielve date y luego string */}
                </div>
                <button onClick={() => editNote(note)} className="btn-edit">
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>  {/* esta es la funcion correcta */}

                {/* <button className="refresh">Actualizar</button> */}
                <button onClick={() => removeNote(note.id)} data-testid="delete-note">
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
