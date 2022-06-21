export const signInWithEmailAndPassword = (auth = {}, emailUser, passwordUser) => Promise.resolve({ user: { email: emailUser, password: passwordUser } });
/* export const useAuth = () => Promise.resolve({}); */
export const useAuth = function () {
    return { login: () => Promise.resolve(), loginWithGoogle: () => Promise.resolve(),}
}
 export function AuthProvider({children}) {
    return <>{ children}</>
} 

/*  export function AuthProvider({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
 
   const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
 
   const login = (email, password) => (auth = {}, emailUser, passwordUser) => Promise.resolve({ user: { email: emailUser, password: passwordUser } });
   const logout = () => signOut(auth)
 
   const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleProvider)
   }
} */
