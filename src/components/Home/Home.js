import React, { useEffect, useState } from "react";
import { HomeNotes } from "./HomeNotes";
import { db } from "../../Firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";


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

    const gettingNotes = async () => {   // para recuperar todos los documentos de una colección
        const querySnapshot = await getDocs(collection(db, "text"))
        const dataNote = [];
        /* const dataPost = doc.data(); */
        querySnapshot.forEach((doc) => {
            if (doc.data().author === localStorage.getItem('userEmail')) {//doc.data transforma los datos de un objeto de firebase a un objeto de javascript
            dataNote.push({...doc.data(),  id:doc.id});
            }
        })
        setText(dataNote);
    };

    useEffect(() => {
        gettingNotes();
    }, []);

    return <div>
            <HomeNotes addOrEditNote={addOrEditNote} />
            <p>Bienvenido</p>
    </div>
};