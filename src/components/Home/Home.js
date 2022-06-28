import React, { useEffect, useState } from "react";
import { HomeNotes } from "./HomeNotes";
import { db } from "../../Firebase/config";
import { collection,
        addDoc,
        getDocs,
        /* onSnapshot,
        query,
        where, */
        /* deleteDoc,
        doc,
        orderBy,
        getDocs,
        getDoc,
        updateDoc, */} from "firebase/firestore";


export const Home = () => {

    const [text, setText] = useState([]);

    const addOrEditNote = async (noteObject) => {  //Agrega un documento, Pero a veces no hay un ID significativo para el documento y es más conveniente dejar que Cloud Firestore genere automáticamente un ID. Para hacerlo, llama a add()
        try {
        const docRef = await addDoc(collection(db, "text"), noteObject);
        console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.error('Error adding document: ', e);
        }
    };

   /*  const gettingNotes = async () => {   // para recuperar todos los documentos de una colección
        const q = query(collection(db, "text"), where("autor", "==", localStorage.getItem("email")));
        onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id:doc.id});
             
            });
            setText(docs);
        });
        };
      gettingNotes(); */
      const gettingNotes = async () => {
       const querySnapshot = await getDocs(collection(db, "text"))
        const docs = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            if (doc.data().autor === localStorage.getItem('userEmail')) {//doc.data transforma los datos de un objeto de firebase a un objeto de javascript
                docs.push({...doc.data(),  id:doc.id});
            }
        })
        setText(docs);
    };

    useEffect(() => {
        gettingNotes();
    }, []);

    return (
        <div>
            <div className="col-md-4 p-2 ">
            <HomeNotes addOrEditNote={addOrEditNote} />
            </div>
            <div>
                {text.map(note => (
                   <div className="card mb-1 p-2">
                        <div className="card body">
                            <div>
                            <h4>{note.name}</h4>
                            </div>
                            <p>{note.description}</p>
                            {/* <a href={text.url} target="_blank">Ir al sitio web</a> */}
                        </div>
                    </div>
                ))}
            </div>
    </div>)
};