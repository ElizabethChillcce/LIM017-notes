import React, { useEffect, useState } from "react";
import { HomeNotes } from "./HomeNotes";
/* import { db } from "../../Firebase/config"; */

import {
    watchNotes,
    deleteNote,
    watchNotesDos,
} from "../../context/noteFirestore";




export const Home = (props) => {

    const [notes, setNotes] = useState([]);

        const getNotes = async () => {
            debugger
           await watchNotes().then((response) => {
                console.log(response);
                setNotes(response);
            })
        }

useEffect(() => {
    watchNotesDos(setNotes); //actualizando con el useStade "setNotes" pasandolo como un callback para ello usando la funcion watchNotesDos q tiene onSnapshot
        console.log("hola");
    }, []);

    const removeNote = async (id) => {
        console.log(id)
        debugger
      await deleteNote(id);
      /* getNotes(); */ //llamndo a una funcion para q actualize el interfaz
      /* return props.removeNote */
    }

    return (
        <div>
            <div>
            <HomeNotes getNotes={getNotes}/>   {/* compartiendo con el hijo un props  getNotes*/}
            </div>
            <div className="post-Notes">
            {notes.map((note) => (
                    <div  key={note.id} className="card mb-1 p-2">
                        <div className="card body">
                            <p>Fecha: {/* {note.timeStamp} */} </p>
                            <div className="container-post-title">
                                <h4 className="post-title">{note.title}</h4>
                            </div>
                            <div>
                                <p>{note.description}</p>
                            </div>
                        </div>
                        <button /* onClick={handleSubmit} */>Editar</button>
                        <button className='refresh' >Actualizar</button>
                        <button onClick={() => removeNote(note.id)}>Borrar</button>
                    </div>
                    ))}
            </div>
    </div>)
    }