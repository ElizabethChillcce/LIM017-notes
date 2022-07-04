import React, { useState } from "react";
import { useAuth } from '../../context/authContext';
import laptop from '../../images/laptop.png';
import './Home.css'

export function HomeNotes (props) {

    const initialStateValue = {
        title: '',
        description: '',
        /* id: auth.currentUser.uid,
        photo: auth.currentUser.photoURL, */
        autor: localStorage.getItem('userEmail'),
        timeStamp: new Date(),
        /* date: new Date().toLocaleDateString('es'), */
        /* hora: new Date().toLocaleTimeString('es'), */
    }
    const [values, setValues] = useState(initialStateValue);

    const {user, logout, loading} = useAuth();


    const handleLogout = async () => {
    try {
        await logout();
    }
    catch (error) {
        console.log(error(error));
    }
    };
    if (loading) return <h2>Actualizando</h2>

    

     

     const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
        };

    const handleSubmit = e => {
        e.preventDefault();
        props.addOrEditNote(values);
        setValues({ ...initialStateValue })
    };

    return <div>
        <section>
            <header className='container-title-image-home'>
                <h2>Yuyarinapaq</h2>
                <img src={laptop} className="laptop" alt="" />
                <button onClick={handleLogout} className="btn-sign-off">
                <i className="fa-solid fa-right-from-bracket" id="icono-sign-off"></i>
                </button>
            </header>
            <p>Hola: {user.displayName || user.email}</p>
            <p>Escribe tus recordatorios!!</p>
            <div id='box-comment'>
                <form className="form-for-notes">
                    <input
                    type='text'
                    name='title'
                    className='title-note'
                    placeholder='Título'
                    onChange={handleInputChange}
                    value={values.title}
                    />
                    {/* <input type="file"/> */}
                    <p><textarea
                    className="comment-post"
                    name='description'
                    placeholder='Escribe tus recordatorios'
                    onChange={handleInputChange}
                    value={values.description}
                    ></textarea></p>
                    <button
                    onClick={handleSubmit}>
                    Guardar
                    </button>
                    <button
                    type="reset"
                    className='deleteCamp'>
                    <i className="fa-solid fa-trash-can"></i>  {/* icono del tachito */}
                    </button>
                </form>
            </div>
        </section>
    </div>;
}