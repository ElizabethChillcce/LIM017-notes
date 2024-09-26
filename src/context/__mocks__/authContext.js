export const signInWithEmailAndPassword = (auth = {}, emailUser, passwordUser) => Promise.resolve({ user: { email: emailUser, password: passwordUser } });

export const useAuth = function () {
    return { login: () => Promise.resolve(), loginWithGoogle: () => Promise.resolve(), user:{displayName:"test"}}
}

export function AuthProvider({children}) {
    return <>{ children}</>
}
 //mokear context