import './Login.css'
import laptop from '../../images/laptop.png';
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
 
export function Login () {
    const [user, setUser] = useState ({
        email: '',
        password: '',
    });

   const {login, loginWithGoogle} = useAuth ()
   const navigate = useNavigate()
   const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) =>
        setUser({...user, [name]: value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
        await login(user.email, user.password)
        navigate('/home')
    } catch (error) {
        console.log(error);
        if (error.code === 'auth/user-not-found') {
            setError('No hay usuario registrado con ese correo.')
            return
        }
        if (error.code === "auth/wrong-password") {
            setError ('La contraseña no es válida, verifica e intente de nuevo.')
            return
        }
        if (error.code === "auth/invalid-email") {
            setError ('El correo ingresado es inválido')
            return
        }
        if (error.code === "auth/internal-error") {
            setError ('Error revise los campos de registro')
            return
        }
        /* setError(error.menssage); */
       /*  switch (error.code) {
            case 'error.code === "auth/internal-error"' : setError("Correo Inválido")/* ='El correo es obligatorio'; break;
            case 'error.code === "auth/invalid-email"': setError ('Digite un correo válido'); break;
            case 'error.code === "auth/email-already-in-use"': setError ('El correo electrónico proporcionado esta siendo utilizado por otro miembro, verifica e intente de nuevo.'); break;
            default: return error.code;
          } */
          return setError(error.code);
        }
    }

    const handleGoogle = async () => {
        try{
        /* throw new Error("google error"); */
        await loginWithGoogle();
        navigate('/home');
        }catch (error) {
        setError (error.message);
        }
    };

        return <div>
            <section>
                <section id="containerTitleImage">
                    <h2 className="titleMain">YUYARINAPAQ</h2>
                    <img src={laptop} className="laptop" alt="" />
                </section>
                <section className="textContainer">
                    <h3 className="textLogin">Login</h3>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email<br></br>
                    <input type='email' data-testid="createEmail" placeholder ='elichil@example.com' name ='email' onChange={handleChange} />
                    </label>
                    <p id='messageEmail'></p><br></br>
                    <label htmlFor='password'>Contraseña<br></br>
                    <input type= 'password' data-testid="createPassword" placeholder ='Mayor a 6 carácteres' name ='password' onChange={handleChange}/>
                    </label>
                   {/* <p id='messagePassword'></p> */}
                    {error && <p id='messageVerificado'>{error}</p>}
                    <button id='getInto' onChange={handleChange}> Iniciar sesión</button>
                    <div id='registerLink'>
                    <p>¿No tienes cuenta? <a href='/register'><span className='link-span'><strong>Regístrate</strong></span></a></p>
                    </div>
                     <button id='buttonBackHome' className='buttonHome'></button>
                    </form>
                    <button onClick={handleGoogle} id='buttonGoogle'> Iniciar con Google</button>
                </section>
            </section>
            </div>;
}
