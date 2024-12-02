import React from 'react';
import { Link } from 'react-router-dom';
import './addadmin.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Header from '../components/header';
import { useNavigate } from "react-router-dom";

const Addadmin = () => {
    const navigate = useNavigate(); // Hook para manejar la navegación

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
            navigate("/admin"); // Navegar a la ruta /alumnos;
        });
    };

    return (
        <div className="addadmin-page-container">
            <Header />
            <main className="addadmin-page-main-content">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                    <h2>Editor de Administradores</h2>
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
