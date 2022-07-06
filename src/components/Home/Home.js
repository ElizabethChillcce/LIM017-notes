import React, { useEffect, useState } from "react";
import { HomeNotes } from "./HomeNotes";
/* import { db } from "../../Firebase/config"; */

import {
    watchNotes,
    deleteNote,
} from "../../context/noteFirestore";




export const Home = (props) => {

    const [notes, setNotes] = useState([]);

   
   /* const gettingNotes = async () => {
        const q = query(collection(db, "notes"));
        onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id:doc.id});
            });
            setNotes(docs);
        });
        }; */
        const getNotes = async () => {
           await watchNotes().then((response) => {
                console.log(response);
                setNotes(response);
            })
        }

useEffect(() => {
    getNotes();
        console.log("hola");
    }, []);

    const removeNote = async (id) => {
        console.log(id)
      await deleteNote(id);
      /* return props.removeNote */
    }

    return (
        <div>
            <div>
            <HomeNotes getNotes={getNotes}/>
            </div>
            <div className="post-Notes">
            {notes.map((note) => (
                    <div  key={note.id} className="card mb-1 p-2">
                        <div className="card body">
                            <div>
                            <h4>{note.title}</h4>
                            </div>
                            <div>
                            <p>{note.description}</p>
                            </div>
                        </div>
                        {/* <button onClick={handleSubmit}>Editar</button> */}
                        <button onClick={() => removeNote(note.id)}>Borrar</button>
                    </div>
                    ))}
            </div>
    </div>)
    }