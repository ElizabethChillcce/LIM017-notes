import { db } from "../Firebase/config";   //base de datos

import { collection,
    addDoc,   //se añade un documento
    onSnapshot,
    query,
    deleteDoc,
    /* where,
    doc,
    getDocs,
    orderBy,
    getDocs,
    getDoc,
    updateDoc, */} from "firebase/firestore";

  export const addOrEditNote = async (noteObject) => {  //Agrega un documento, Pero a veces no hay un ID significativo para el documento y es más conveniente dejar que Cloud Firestore genere automáticamente un ID. Para hacerlo, llama a add()
        try {
        const docRef = await addDoc(collection(db, "notes"), noteObject);
        console.log("Document written with ID: ", docRef.id);
        }
        catch (e) {
            console.error('Error adding document: ', e);
        }
    };

 export const gettingNotes = async () => {   // para recuperar todos los documentos de una colección
        const q = query(collection(db, "notes")/* , where("autor", "==", localStorage.getItem("userEmail")) */);
        onSnapshot(q, (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id:doc.id});
            });
            setNotes(docs);
        });
        };

export const deleteNote = async (id) => {
        await deleteDoc(doc(db, "notes", id));
    };

