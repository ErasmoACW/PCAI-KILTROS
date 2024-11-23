import React from 'react';
import { Link } from 'react-router-dom';
import './addalumnos.css';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Addalumnos = () => {

    const initialValues = {
        nombre: "",
        apellido_1: "",
        apellido_2: "",
        rut: "",
        correo_ap: "",
        nombre_ap: "",
        apellido_ap: "",
        curso: "",
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required(),
        apellido_1: Yup.string().required(),
        apellido_2: Yup.string().required(),
        rut: Yup.string().required(),
        correo_ap: Yup.string().required(),
        nombre_ap: Yup.string().required(),
        apellido_ap: Yup.string().required(),
        curso: Yup.string().required(),
    })

    const onSubmit = (data) => {
        axios.post("http://localhost:8800/alumnos", data).then((response) => {
            window.location.reload();
        });
    };

    return (
        <div className="addalumnos-page-container">
            <header className="addalumnos-page-header">
                <div className="addalumnos-page-logo">PCAI</div>
                <div className="addalumnos-page-buttons">
                    <Link to="/home" className="addalumnos-page-btn">Home</Link>
                    <Link to="/admin" className="addalumnos-page-btn">Admins</Link>
                    <Link to="/alumnos" className="addalumnos-page-btn">Alumnos</Link>
                    <Link to="/asistencia" className="addalumnos-page-btn">Asistencia</Link>
                    <Link to="/scaner" className="addalumnos-page-btn">Escaner QR</Link>
                    <Link to="/" className="addalumnos-page-btn">Cerrar Sesion</Link>
                </div>
            </header>
            <main className="addalumnos-page-main-content">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="nombre">Nombre:</label>
                            <Field
                                className="form-input"
                                id="nombre"
                                name="nombre"
                                placeholder="Ej: Juan"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="apellido_1">Apellido Paterno:</label>
                            <Field
                                className="form-input"
                                id="apellido_1"
                                name="apellido_1"
                                placeholder="Ej: Soto"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="apellido_2">Apellido Materno:</label>
                            <Field
                                className="form-input"
                                id="apellido_2"
                                name="apellido_2"
                                placeholder="Ej: Rojas"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="rut">Rut:</label>
                            <Field
                                className="form-input"
                                id="rut"
                                name="rut"
                                placeholder="Ej: 20.520.671-K"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="correo_ap">Correo Apoderado:</label>
                            <Field
                                className="form-input"
                                id="correo_ap"
                                name="correo_ap"
                                placeholder="Ej: ejemplo@gmail.com"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="nombre_ap">Nombre Apoderado:</label>
                            <Field
                                className="form-input"
                                id="nombre_ap"
                                name="nombre_ap"
                                placeholder="Ej: Mario"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="apellido_ap">Apellido Apoderado:</label>
                            <Field
                                className="form-input"
                                id="apellido_ap"
                                name="apellido_ap"
                                placeholder="Ej: Soto"
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="curso">Curso:</label>
                            <Field
                                as="select" // Cambiado para usar un select
                                className="form-input"
                                id="curso"
                                name="curso"
                            >
                                <option value="">Selecciona un curso</option>
                                <option value="1°">1°</option>
                                <option value="2°">2°</option>
                                <option value="3°">3°</option>
                                <option value="4°">4°</option>
                            </Field>
                        </div>

                        <button type="submit" className="form-button">Crear Alumno</button>
                    </Form>
                </Formik>
            </main>
        </div>
    );
};

export default Addalumnos;
