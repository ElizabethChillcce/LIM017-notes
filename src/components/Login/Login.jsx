import './Login.css'
/* import laptop from '../../images/laptop.png'; */
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import video from '../../video/loginVideo.mp4';
import google from"../../images/google.png";
import back from"../../images/back.png";

export function Login() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { login, loginWithGoogle } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState();

    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value });

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
                setError('La contraseña no es válida, verifica e intente de nuevo.')
                return
            }
            if (error.code === "auth/invalid-email") {
                setError('El correo ingresado es inválido')
                return
            }
            if (error.code === "auth/internal-error") {
                setError('Error revise los campos de registro')
                return
            }
            return setError(error.code);
        }
    }

    const handleGoogle = async () => {
        try {
            /* throw new Error("google error"); */
            await loginWithGoogle();
            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    };

    return <div>
        <section>
            <section>
                <div id="container-title-image">
                    <h2 className="title-register-main">YUYARINAPAQ</h2>
                    {/* <img src={laptop} className="laptop" alt="" /> */}
                    <video src={video} type="video/mp4" className="logo-video-register" with='40px' autoPlay muted loop> </video>
                </div>
                <h3 className="title-spanish-main">Recordatorio</h3>
            </section>
            <section className="text-container">
                <h3 className="text-login">Iniciar sesión</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email' className="email-password">Email<br></br>
                        <input type='email' data-testid="createEmail" className="create-email-password" placeholder='elichil@example.com' name='email' onChange={handleChange} />
                    </label>
                    <p id='messageEmail'></p><br></br>
                    <label htmlFor='password' className="email-password">Contraseña<br></br>
                        <input type='password' data-testid="createPassword" className="create-email-password" placeholder='Mayor a 6 carácteres' name='password' onChange={handleChange} />
                    </label>
                    {error && <p id='messageVerificado'>{error}</p>}
                    <button id='get-into' onChange={handleChange}> Iniciar sesión</button>
                    <div id='registerLink'>
                        <p className="to-register">¿No tienes cuenta? <a href='/register'><span className='link-span'><strong>Regístrate</strong></span></a></p>
                    </div>
                </form>
                <button onClick={handleGoogle} id='buttonGoogle'> Iniciar con  <img src={google} className="logo-google" alt="" /></button>
                <div id='to-welcome'>
                    <Link to="/" className="to-welcome">
                        <img src={back} className="logo-back" alt="" />
                    </Link>
                    {/* <Link to="/" className="to-welcome"></Link><i className="fa-solid fa-backward"></i> */}
                </div>
            </section>
        </section>
    </div>;
}
