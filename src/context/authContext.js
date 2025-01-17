import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../Firebase/config";

export const authContext = createContext();

export const useAuth = () => {
   const context = useContext(authContext)
   if(!context) throw new Error("There is no auth provider")
   return context
}

export function AuthProvider({children}) {

   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);

  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)

  const login = (email, password) => signInWithEmailAndPassword(auth, email, password)

  const logout = () => signOut(auth)

  const loginWithGoogle = () => {
   const googleProvider = new GoogleAuthProvider()
   return signInWithPopup(auth, googleProvider)
  }

  useEffect(() =>{
  const unsubscribe = onAuthStateChanged(auth, currentUser => {
    setUser(currentUser);
    setLoading(false)
  })
   return () => unsubscribe(); // este retur quizàs no sea necesario con el const unsusbcreibe de la linea 29 pero no su valor q es importante

}, [])

  return (
  <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle }}>
    {children}
    </authContext.Provider>
  );
}