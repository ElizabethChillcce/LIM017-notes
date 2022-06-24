/* import {  useContext } from 'react'; */
/* import { context } from '../../context/authContext'; */
/* import { useNavigate } from 'react-router-dom'; */
import { useAuth } from '../../context/authContext';
import laptop from '../../images/laptop.png';
import './Home.css'

export function Home () {

    const {user, logout, loading} = useAuth();
    console.log(user);

    const handleLogout = async () => {
    try {
        await logout();
    }
    catch (error) {
        console.log(error(error));
    }
    };

    if (loading) return <h2>Actualizando</h2>

    return <div>
            <section>
            <section className='container-title-image-home'>
            <h2>Yuyarinapaq</h2>
            <img src={laptop} className="laptop" alt="" />
            <button onClick={handleLogout}>
                Cerrar sesión
            </button>
            </section>
            <p>Hola: {user.displayName || user.email}</p>
            <p>Escribe tus recordatorios!!</p> 
            <textarea className="" ></textarea>
            <div>
            <details>
            <summary>Details</summary>
            Something small enough to escape casual notice.
            </details>
            </div>
            </section>
        </div>;
}