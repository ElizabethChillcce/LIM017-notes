import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { addOrEditNote } from "../../context/noteFirestore";
/* import laptop from '../../images/laptop.png'; */
import "./Home.css";
import video1 from "../../video/videoHome.mp4";
import video2 from "../../video/icono-sign-off.mp4";

export function NoteForm() {
    const initialStateValue = {
        title: "",
        description: "",
        autor: localStorage.getItem("email"),
        timeStamp: new Date(),
    };

    const [values, setValues] = useState(initialStateValue);

    const { user, logout, loading } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error(error));
        }
    };
    if (loading) return <h2>Actualizando</h2>;

    //funcion para capturar inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addOrEditNote(values).then((response) => {
            console.log(response);
            setValues({ ...initialStateValue });
            /* getNotes(); */ //saber q fue exitosa guardar la nota (llamando a la funcion getNotes()para que rendrize en el navegador)
        });
    };

    return (
        <div>
            <section>
                <header className="container-title-image-home">
                    <video
                        src={video1}
                        type="video/mp4"
                        className="logo-video-register"
                        with="40px"
                        autoPlay
                        muted
                        loop
                    ></video>
                    <h2 className="title-form">YUYARINAPAQ</h2>
                    <button onClick={handleLogout} className="btn-sign-off">
                        {/* <i className="fa-solid fa-right-from-bracket" id="btn-sign-off"></i> */}
                        <video
                        src={video2}
                        type="video/mp4"
                        className="icono-singn"
                        with="35px"
                        autoPlay
                        muted
                        loop
                        ></video>
                        {/* <img src={iconoSignOff} className="icono-singn" alt="" /> */}
                    </button>
                </header>
                <p className="name-paragraph-form">Hola: {user.displayName || user.email}</p>
                <p className="name-paragraph-form">Escribe tus recordatorios!!</p>
                <div id="box-comment">
                    <form className="form-for-notes">
                        <input
                            type="text"
                            name="title"
                            className="title-note"
                            placeholder="Título"
                            onChange={handleInputChange}
                            value={values.title}
                            required
                        />
                        <p className="description-comment">
                            <textarea
                                className="comment-post"
                                name="description"
                                placeholder="Escribe tus recordatorios"
                                onChange={handleInputChange}
                                value={values.description}
                                rows="4"
                                cols="30"
                            ></textarea>
                        </p>
                        <button className="btn-save" onClick={handleSubmit}>
                            Guardar
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
