  // Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import {getFirestore} from "firebase/firestore";
  import {getAuth} from "firebase/auth";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDWO0cRQ7aj7peHy0NdV9KW2plFRVvUiOk",
    authDomain: "yuyarinapaq-ecf99.firebaseapp.com",
    projectId: "yuyarinapaq-ecf99",
    storageBucket: "yuyarinapaq-ecf99.appspot.com",
    messagingSenderId: "752787050007",
    appId: "1:752787050007:web:184d0e66e6a2d2562c1652"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)
