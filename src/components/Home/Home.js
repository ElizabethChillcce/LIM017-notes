import React, { useEffect, useState } from "react";
import { HomeNotes } from "./HomeNotes";
import { db } from "../../Firebase/config";
import { collection,
        addDoc,
        onSnapshot,
        query,
         /* where,
       deleteDoc,
        doc,
        getDocs,
        orderBy,
        getDocs,
        getDoc,
        updateDoc, */} from "firebase/firestore";


export const Home = () => {

    const [texts, setTexts] = useState([]);

    const addOrEditNote = async (noteObject) => {  //Agrega un documento, Pero a veces no hay un ID significativo para el documento y es más conveniente dejar que Cloud Firestore genere automáticamente un ID. Para hacerlo, llama a add()
        try {
        const docRef = await addDoc(collection(db, "text"), noteObject);
        console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.error('Error adding document: ', e);
        }
    };

   const gettingNotes = async () => {   // para recuperar todos los documentos de una colección
        const q = query(collection(db, "text").ordeBy("timeStamp")/* , where("autor", "==", localStorage.getItem("userEmail")) */);
        onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id:doc.id});
             
            });
           setTexts(docs);
            
        });
        };
        /* setTexts(docs.sort((a, b) =>{
                console.log(a)
                const firstDate = new Date(a.date)
                console.log(firstDate);
                const secondDate = new Date(b.date + b.hora)
                
            }));
        });
    } */

    useEffect(() => {
        gettingNotes();
        console.log("hola");
    }, []);

    return (
        <div>
            <div className=" ">
            <HomeNotes addOrEditNote={addOrEditNote} />
            </div>
            <div className="post-Notes">
                {texts.map(note => (
                   <div className="card mb-1 p-2">
                        <div className="card body">
                            <div>
                            <h4>{note.title}</h4>
                            </div>
                            <p>{note.description}</p>
                            {/* <a href={text.url} target="_blank">Ir al sitio web</a> */}
                        </div>
                    </div>
                ))}
            </div>
    </div>)
   }