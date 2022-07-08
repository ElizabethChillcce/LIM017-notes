import { db } from "../Firebase/config"; //base de datos

import {
  collection,
  addDoc, //se añade un documento
  onSnapshot,
  query,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
/* where,
    orderBy,
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

/* const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
}); */
export const watchNotesDos = (setNotesCallback) => {
 const queryDocs = query(collection(db, "notes"));
 onSnapshot(queryDocs, (querySnapshot) =>{
  debugger
  const notes = [];
  querySnapshot.forEach((doc) => {
    const objetoDocs = doc.data()   //añadiendo al objeto doc.data la propiedad id con su valor atravez de lo ...
      const idValue = {
      id: doc.id,
      ...objetoDocs,
    }
    notes.push(idValue);
  })
  setNotesCallback(notes);
 })
}

export const watchNotes = async () => {
  // para recuperar todos los documentos de una colección
  const notes = [];
  const q = query(collection(db, "notes"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const objetoDocs = doc.data()   //añadiendo al objeto doc.data la propiedad id con su valor atravez de lo ...
    const idValue = {
      id: doc.id,
      ...objetoDocs,
  }
    notes.push(idValue);
    console.log(idValue)
  });
  return notes;
};

//funciòn para eliminar usuarios
export const deleteNote = async (id) => {
  await deleteDoc(doc(db, "notes", id));
};
