import React, { useEffect, useState } from "react";
import { HomeNotes } from "./HomeNotes";
/* import { db } from "../../Firebase/config"; */

import { addOrEditNote,
    gettingNotes,
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

useEffect(() => {
        gettingNotes();
        console.log("hola");
        
    }, []);

    const removeNote = async () => {
      await deleteNote(note.id);
    }

    return (
        <div>
            <div className=" ">
            <HomeNotes addOrEditNote={addOrEditNote} />
            </div>
            <div className="post-Notes">
                {notes.map(note => (
                    <div className="card mb-1 p-2" id="note.id">
                        <div className="card body">
                            <div>
                            <h4>{note.title}</h4>
                            </div>
                            <div>
                            <p>{note.description}</p>
                            </div>
                        </div>
                        {/* <button onClick={handleSubmit}>Editar</button> */}
                        <button onclick={removeNote}>Borrar</button>
                    </div>
                    ))}
            </div>
    </div>)
    }