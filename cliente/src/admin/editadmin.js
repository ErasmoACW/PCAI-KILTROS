import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './editadmin.css';

const Editadmin = () => {
    let { id_admin } = useParams();
    const navigate = useNavigate();

    // Recuperamos los datos iniciales del admin
    const [Data, setData] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8800/admin/${id_admin}`).then((response) => {
            setData(response.data);
        });
    }, [id_admin]);

    const initialValues = {
        usuario: Data.usuario || "",
        contrasena: Data.contrasena || "",
    };

    const validationSchema = Yup.object().shape({
        usuario: Yup.string().required("El usuario es requerido"),
        contrasena: Yup.string().required("La contraseña es requerida"),
    });

    const onSubmit = (Admin) => {
        axios.put(`http://localhost:8800/admin/${id_admin}`, Admin).then(() => {
            navigate("/admin");
        });
    };

    return (
        <div className="editadmin-page-container">
            {/* Header */}
            <header className="editadmin-page-header">
                <div className="editadmin-page-logo">PCAI</div>
                <div className="editadmin-page-buttons">
                    <Link to="/" className="editadmin-page-btn">Home</Link>
                    <Link to="/admin" className="admin-page-btn">Admins</Link>
                    <Link to="/alumnos" className="editadmin-page-btn">Alumnos</Link>
                    <Link to="/asistencia" className="editadmin-page-btn">Asistencia</Link>
                    <Link to="/scaner" className="scanner-page-btn">Escaner QR</Link>
                    <Link to="/login" className="home-btn">Cerrar Sesion</Link>
                </div>
            </header>
            <main className="editadmin-page-main-content">
                
                <Formik
                    onSubmit={onSubmit}
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    <Form className="editadmin-form">
                        <div className="form-group">
                            <label className="form-label">Usuario:</label>
                            <ErrorMessage name="usuario" component="span" className="form-error" />
                            <Field
                                autoComplete="off"
                                name="usuario"
                                placeholder="Usuario"
                                className="form-input"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Contraseña:</label>
                            <ErrorMessage name="contrasena" component="span" className="form-error" />
                            <Field
                                autoComplete="off"
                                name="contrasena"
                                placeholder="Contraseña"
                                className="form-input"
                            />
                        </div>
                        <button className="editadmin-form-button" type="submit">Editar Admin</button>
                    </Form>
                </Formik>
            </main>
        </div>
    );
};

export default Editadmin;
