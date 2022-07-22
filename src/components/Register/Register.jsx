/* eslint-disable jsx-a11y/alt-text */
import './Register.css'
/* import laptop from '../../images/laptop.png'; */
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import video from '../../video/loginVideo.mp4';

export function Register() {
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState();


    const { signup } = useAuth()
    const navigate = useNavigate()
    
    const handleChange = ({ target: { name, value } }) =>
        setUser({ ...user, [name]: value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signup(user.email, user.password)
            navigate('/login')
        } catch (error) {
                switch (error.code) {
                    case "auth/internal-error": return setError("Error revise los campos de registro");
                    case "auth/invalid-email": return setError ('Digite un correo válido');
                    case "auth/email-already-in-use": return setError ('El correo electrónico proporcionado esta siendo utilizado por otro miembro, verifica e intente de nuevo.');
                    case "auth/weak-password": return setError('La contraseña debe tener como mínimo 6 carácteres');
                    default: return error.code;
                }
            }
    }

    return( <>
        <section>
            <section>
                <div id="container-title-image">
                    <h2 className="title-register-main">YUYARINAPAQ</h2>
                    {/* <img src={laptop} className="laptop" /> */}
                    <video src={video} type="video/mp4" className="logo-video-register" with='40px' autoPlay muted loop> </video>
                </div>
                <h3 className="title-spanish-main">Recordatorio</h3>
            </section>
            <section className="text-container-register">
                <h3 className="text-register">Registro</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor='email'>Email
                        <input type='email' id='input-email-password' placeholder='elichil@example.com' name='email' onChange={handleChange} />
                    </label>
                    <label htmlFor='password'>Contraseña
                        <input type='password' id='input-email-password' placeholder='Mayor a 6 carácteres' name='password' onChange={handleChange} />
                    </label>
                    {error && <p id='message-verified'>{error}</p>}
                    <button id='button-user-register' onChange={handleChange}> Crear ususario</button>
                    <div id='container-link'>
                        <Link to="/" className="link-beginning">Volver a inicio</Link>
                    </div>
                </form>
            </section>
        </section>
    </>);
}
