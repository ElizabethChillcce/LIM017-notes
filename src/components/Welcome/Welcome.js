/* eslint-disable jsx-a11y/alt-text */
import { Link } from 'react-router-dom';
import logoWelcome from '../../images/logoWelcome.png';
import './Welcome.css'

export function Welcome () {
    return <div>
        <section id="welcomePage">
        <h1 className="title-main">YUYARINAPAQ</h1>
        <h2 className="title-spanish">Recordatorio</h2>
        <p>"El que no tiene memoria, se<br></br>hace una de papel o una digital"</p>
        <img src={logoWelcome} className="logo-welcome" />
        <div className="containerGetInto">
        <Link to="/register" className="linkRegister">Registrarse</Link><br></br>
        </div>
        <div className="containerLogin">
        <Link to="/login" className="linkLogin">Login</Link>
        </div>
        </section>
    </div>;
}
/*  const getInto = () => {
      alert("Ingresa")
   }
    document.getElementById("btnGetInto").addEventListener("click",getInto) */
    