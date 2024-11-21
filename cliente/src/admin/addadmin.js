import React from 'react';
import { Link } from 'react-router-dom';
import './addadmin.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Addadmin = () => {

    const initialValues = {
        usuario: "",
        contrasena: "",
    };

    const validationSchema = Yup.object().shape({
        usuario: Yup.string().required("Este campo es obligatorio"),
        contrasena: Yup.string().required("Este campo es obligatorio"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:8800/admin/insert", data).then((response) => {
            window.location.reload();
        });
    };

    return (
        <div className="addadmin-page-container">
            <header className="addadmin-page-header">
                <div className="addadmin-page-logo">PCAI</div>
                <div className="addadmin-page-buttons">
                    <Link to="/home" className="addadmin-page-btn">Home</Link>
                    <Link to="/admin" className="addadmin-page-btn">Admins</Link>
                    <Link to="/alumnos" className="addadmin-page-btn">Alumnos</Link>
                    <Link to="/asistencia" className="addadmin-page-btn">Asistencia</Link>
                    <Link to="/scaner" className="scanner-page-btn">Escaner QR</Link>
                    <Link to="/" className="home-btn">Cerrar Sesion</Link>
                    
                </div>
            </header>
            <main className="addadmin-page-main-content">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="usuario">Usuario:</label>
                            <Field
                                className="form-input"
                                id="usuario"
                                name="usuario"
                                placeholder="Ej: Juan"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="contrasena">Contraseña:</label>
                            <Field
                                className="form-input"
                                id="contrasena"
                                name="contrasena"
                                placeholder="Ej: 1234"
                            />
                        </div>
                        <button type="submit" className="form-button">Crear Admin</button>
                    </Form>
                </Formik>
            </main>
        </div>
    );
};

export default Addadmin;
