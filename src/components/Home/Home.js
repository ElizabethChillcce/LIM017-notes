import React, { useEffect, useState } from "react";
import { HomeNotes } from "./HomeNotes";

import {
  watchNotes,
  deleteNote,
  watchNotesDos,
  getNoteById,
  updateNote,
} from "../../context/noteFirestore";

export const Home = (props) => {
  const [notes, setNotes] = useState([]);

  const [editId, setEditId] = useState(""); //identificar el id q vamos a editar

  const getNotes = async () => {
    debugger;
    await watchNotes().then((response) => {
      console.log(response);
      setNotes(response);
    });
  };

  //funcion para editar las notas
  const editNote = (note) => {
    console.log(note);
  };

  useEffect(() => {
    watchNotesDos(setNotes); //actualizando con el useStade "setNotes" pasandolo como un callback para ello usando la funcion watchNotesDos q tiene onSnapshot
    console.log("hola");
  }, []);

  //funcion eliminar notas
  const removeNote = async (id) => {
    console.log(id);
    debugger;
    await deleteNote(id);
    /* getNotes(); */ //llamndo a una funcion para q actualize el interfaz
    /* return props.removeNote */
  };

  return (
    <div>
        <div>
            <HomeNotes getNotes={getNotes} />{" "}
            {/* compartiendo con el hijo un props  getNotes*/}
        </div>
    <div className="container-post-notes">
        <div className="post-Notes">
            {notes.map((note) => (
                <div key={note.id} className="card mb-1 p-2">
                    <div className="card body">
                <div className="container-post-title">
                    <h4 className="post-title">{note.title}</h4>
                </div>
                <div>
                    <p className="post-description">{note.description}</p>
                </div>
            </div>
                <div className="container-btn-date">
                    <div className="post-date">Fecha: {/* {note.timeStamp} */} </div>
                    <button onClick={() => editNote(note)} className="btn-edit">
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                    {/* <button className="refresh">Actualizar</button> */}
                    <button onClick={() => removeNote(note.id)}>
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
