import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './editalumnos.css';

const Editalumnos = () => {
    let { id_alumno } = useParams();
    const navigate = useNavigate();

    // Recuperamos los datos iniciales del alumno
    const [Data, setData] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8800/alumnos/${id_alumno}`).then((response) => {
            setData(response.data);
        });
    }, [id_alumno]);

    const initialValues = {
        nombre: Data.nombre || "",
        apellido_1: Data.apellido_1 || "",
        apellido_2: Data.apellido_2 || "",
        correo_ap: Data.correo_ap || "",
        nombre_ap: Data.nombre_ap || "",
        apellido_ap: Data.apellido_ap || "",
        curso: Data.curso || "",
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required("El nombre es requerido."),
        apellido_1: Yup.string().required("El primer apellido es requerido."),
        apellido_2: Yup.string().required("El segundo apellido es requerido."),
        correo_ap: Yup.string().required("El correo es requerido."),
        nombre_ap: Yup.string().required("El nombre del apoderado es requerido."),
        apellido_ap: Yup.string().required("El apellido del apoderado es requerido."),
        curso: Yup.string().required("El curso es requerido."),
    });

    const onSubmit = (Alumno) => {
        axios.put(`http://localhost:8800/alumnos/${id_alumno}`, Alumno).then(() => {
            navigate("/alumnos");
        });
    };

    return (
        <div className="editalumnos-page-container">
            {/* Header */}
            <header className="editalumnos-page-header">
                <div className="editalumnos-page-logo">PCAI</div>
                <div className="editalumnos-page-buttons">
                    <Link to="/home" className="editalumnos-page-btn">Home</Link>
                    <Link to="/admin" className="editalumnos-page-btn">Admins</Link>
                    <Link to="/alumnos" className="editalumnos-page-btn">Alumnos</Link>
                    <Link to="/asistencia" className="editalumnos-page-btn">Asistencia</Link>
                    <Link to="/scaner" className="editalumnos-page-btn">Escaner QR</Link>
                    <Link to="/" className="editalumnos-page-btn">Cerrar Sesion</Link>
                </div>
            </header>
            <main className="editalumnos-page-main-content">
 
                <Formik
                    onSubmit={onSubmit}
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    <Form className="editalumnos-form">
                        <div className="form-group">
                            <label htmlFor="nombre" className="form-label">Nombre:</label>
                            <Field
                                id="nombre"
                                name="nombre"
                                placeholder="Nombre"
                                className="form-input"
                                autoComplete="off"
                            />
                            <ErrorMessage name="nombre" component="span" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido_1" className="form-label">Primer Apellido:</label>
                            <Field
                                id="apellido_1"
                                name="apellido_1"
                                placeholder="Apellido"
                                className="form-input"
                                autoComplete="off"
                            />
                            <ErrorMessage name="apellido_1" component="span" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido_2" className="form-label">Segundo Apellido:</label>
                            <Field
                                id="apellido_2"
                                name="apellido_2"
                                placeholder="Apellido"
                                className="form-input"
                                autoComplete="off"
                            />
                            <ErrorMessage name="apellido_2" component="span" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="correo_ap" className="form-label">Correo Apoderado:</label>
                            <Field
                                id="correo_ap"
                                name="correo_ap"
                                placeholder="Correo"
                                className="form-input"
                                autoComplete="off"
                            />
                            <ErrorMessage name="correo_ap" component="span" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nombre_ap" className="form-label">Nombre Apoderado:</label>
                            <Field
                                id="nombre_ap"
                                name="nombre_ap"
                                placeholder="Nombre Apoderado"
                                className="form-input"
                                autoComplete="off"
                            />
                            <ErrorMessage name="nombre_ap" component="span" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="apellido_ap" className="form-label">Apellido Apoderado:</label>
                            <Field
                                id="apellido_ap"
                                name="apellido_ap"
                                placeholder="Apellido Apoderado"
                                className="form-input"
                                autoComplete="off"
                            />
                            <ErrorMessage name="apellido_ap" component="span" className="form-error" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="curso" className="form-label">Curso:</label>
                            <Field
                                id="curso"
                                name="curso"
                                placeholder="Curso"
                                className="form-input"
                                autoComplete="off"
                            />
                            <ErrorMessage name="curso" component="span" className="form-error" />
                        </div>
                        <button className="editalumnos-form-button" type="submit">
                            Editar Alumno
                        </button>
                    </Form>
                </Formik>
            </main>
        </div>
    );
};

export default Editalumnos;
