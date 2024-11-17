import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './editalumnos.css';

const Editalumnos = () => {
    let { id_alumno } = useParams();
    const navigate = useNavigate();

    //Recuperamos los datos iniciales del alumno
    const [Data, setData] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8800/alumnos/${id_alumno}`).then((response) => {
            setData(response.data)
        });
    }, []);

    const initialValues = {
        nombre: Data.nombre,
        apellido_1: Data.apellido_1,
        apellido_2: Data.apellido_2,
    };

    const validationSchema = Yup.object().shape({
        nombre: Yup.string().required(),
        apellido_1: Yup.string().required(),
        apellido_2: Yup.string().required(),
    });

    const onSubmit = (Alumno) => {
        axios.put(`http://localhost:8800/alumnos/` + id_alumno, Alumno).then((response) => {});
        navigate("/alumnos");
    };

    return(
        <div className="alumnos-page-container">
            {/* Header */}
            <header className="alumnos-page-header">
                <div className="alumnos-page-logo">PCAI</div>
                <div className="alumnos-page-buttons">
                    <Link to="/" className="alumnos-page-btn">Home</Link>
                    <Link to="/alumnos" className="alumnos-page-btn">Alumnos</Link>
                    <Link to="/asistencia" className="alumnos-page-btn">Asistencia</Link>
                </div>
            </header>
            <main className="alumnos-page-table">
                <h1>Editar Alumno</h1>
                <Formik
                    onSubmit={onSubmit}
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <label>Nombre: </label>
                        <ErrorMessage name="nombre" component="span" className="errorMessage" />
                        <Field
                            autoComplete="off"
                            name="nombre"
                            placeholder="Nombre"
                        />
                        <label>Apellido: </label>
                        <ErrorMessage name="apellido_1" component="span" className="errorMessage" />
                        <Field
                            autoComplete="off"
                            name="apellido_1"
                            placeholder="Apellido"
                        />
                        <label>Apellido: </label>
                        <ErrorMessage name="apellido_2" component="span" className="errorMessage" />
                        <Field
                            autoComplete="off"
                            name="apellido_2"
                            placeholder="Apellido"
                        />
                        <button className="alumnos-page-edit-btn" type="submit">Editar Alumno</button>
                    </Form>
                </Formik>
            </main>
        </div>
    );
}

export default Editalumnos;