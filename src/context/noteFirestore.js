import { db } from "../Firebase/config"; //base de datos

import {
  collection,
  addDoc, //se añade un documento
  onSnapshot,
  query,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  where,
} from "firebase/firestore";

//Agrega un documento, Pero a veces no hay un ID significativo para el documento y es más conveniente dejar que Cloud Firestore genere automáticamente un ID. Para hacerlo, llama a add()
export const addOrEditNote = async (noteObject) => {
  try {
    const docRef = await addDoc(collection(db, "notes"), noteObject);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

//funciòn q utiliza onSnapshot para recuperar todos los documentos de una colección
export const watchNotesDos = (setNotesCallback, user) => {
  console.log("funcion original")
  const queryDocs = query(collection(db, "notes") , where("autor", "==", user.email));
  onSnapshot(queryDocs, (querySnapshot) => {
    const notes = [];
    querySnapshot.forEach((doc) => {
      const objetoDocs = doc.data(); //añadiendo al objeto doc.data la propiedad id con su valor atravez de lo ...
      const idValue = {
        id: doc.id,
        ...objetoDocs,
      };
      notes.push(idValue);
    });
    console.log(notes);
    setNotesCallback(notes);
  });
};

// para recuperar todos los documentos de una colección
export const watchNotes = async () => {
  const notes = [];
  const q = query(collection(db, "notes"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const objetoDocs = doc.data(); //añadiendo al objeto doc.data la propiedad id con su valor atravez de lo ...
    const idValue = {
      id: doc.id,
      ...objetoDocs,
    };
    notes.push(idValue);
    console.log(idValue);
  });
  return notes;
};

//funciòn para eliminar usuarios
export const deleteNote = async (id) => {
  await deleteDoc(doc(db, "notes", id));
};

export const updateNote = (id, objChanges) => {
  return updateDoc(doc(db, "notes", id), objChanges);
};
