    /* eslint-disable jsx-a11y/alt-text */
    import { Link } from 'react-router-dom';
    /* import logoWelcome from '../../images/logoWelcome.png'; */
    import './Welcome.css'
    import video from '../../video/logo-teclas.mp4'

    export function Welcome () {
        return <div>
            <section id="welcomePage">
            <h1 className="title-main">YUYARINAPAQ</h1>
            <h2 className="title-spanish">Recordatorio</h2>
            <p>"El que no tiene memoria, se<br></br>hace una de papel o una digital"</p>
            {/* <img src={logoWelcome} className="logo-welcome" /> */}
            <video src={video} type="video/mp4" className="logo-video" with='40px' autoPlay  muted loop> </video>
            <div className="btn-welcome">
            <div className="containerGetInto">
            <Link to="/register" className="link-register">Registrarse</Link><br></br>
            </div>
            <div className="containerLogin">
            <Link to="/login" className="link-login">Login</Link>
            </div>
            </div>
            </section>
        </div>;
    }
