/* eslint-disable jsx-a11y/alt-text */
import './Register.css'
/* import laptop from '../../images/laptop.png'; */
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import video from '../../video/logo-teclas.mp4'
 
export function Register () {
    const [user, setUser] = useState ({
        email: '',
        password: '',
    });

   const {signup} = useAuth ()
   const navigate = useNavigate()
   const [error, setError] = useState();

    const handleChange = ({target: {name, value}}) =>
        setUser({...user, [name]: value});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        try {
        await signup(user.email, user.password)
        navigate('/login')
    } catch (error) {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
            setError('Correo Inválido')
            return
        }
        if (error.code === "auth/weak-password") {
            setError ('La contraseña debe tener como mínimo 6 carácteres')
            return
        }
        if (error.code === "auth/email-already-in-use") {
            setError ('El correo ya esta registrado')
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

        return <div>
            <section>
                <section>
                    <div id="container-title-image">
                        <h2 className="title-register-main">YUYARINAPAQ</h2>
                        {/* <img src={laptop} className="laptop" /> */}
                        <video src={video} type="video/mp4" className="logo-video-register" with='40px' autoPlay  muted loop> </video>
                    </div>
                        <h3 className="title-spanish-main">Recordatorio</h3>
                </section>
                <section className="textContainerRegister">
                    <h3 className="textRegister">Registro</h3>
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre de usuario<br></br>
                    <input type='text' id='createName' placeholder ='Ejm: Eli Chil' name ='nameUser' onChange={handleChange} />
                    </label><br></br>
                    <label htmlFor='email'>Email<br></br>
                    <input type='email' id='createEmail' placeholder ='elichil@example.com' name ='email' onChange={handleChange} />
                    </label>
                    <p id='messageEmail'></p><br></br>
                    <label htmlFor='password'>Contraseña<br></br>
                    <input type= 'password' id='createPassword' placeholder ='Mayor a 6 carácteres' name ='password' onChange={handleChange}/>
                    </label>
                    {error && <p id='messageVerificado'>{error}</p>}
                    <button id='buttonUserRegister' onChange={handleChange}> Crear Ususario</button>
                    <div id='containerLink'>
                    <Link to="/" className="linkBeginning">Volver a inicio</Link>
                    </div>
                    </form>
                </section>
            </section>
            </div>;
}
