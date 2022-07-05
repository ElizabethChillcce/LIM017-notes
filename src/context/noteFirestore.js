import { db } from "../Firebase/config"; //base de datos

import {
  collection,
  addDoc, //se añade un documento
  //onSnapshot,
  query,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
/* where,
    orderBy,
    getDocs,
    getDoc,
    updateDoc, */

export const addOrEditNote = async (noteObject) => {
  //Agrega un documento, Pero a veces no hay un ID significativo para el documento y es más conveniente dejar que Cloud Firestore genere automáticamente un ID. Para hacerlo, llama a add()
  try {
    const docRef = await addDoc(collection(db, "notes"), noteObject);
    console.log("Document written with ID: ", docRef.id);
    return docRef; //retornando una promesa
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const gettingNotes = async () => {
  // para recuperar todos los documentos de una colección
  const notes = [];
  const q = query(collection(db, "notes"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((docs) => {
    notes.push(docs.data());
  });
  return notes;
};

//funciòn para eliminar usuarios
export const deleteNote = async (id) => {
  await deleteDoc(doc(db, "notes", id));
};
