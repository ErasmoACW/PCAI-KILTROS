import React from 'react';
import { Link } from 'react-router-dom';

import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


function Addcurso() {

    const initialValues = {
        curso: "",
    };

    const validationSchema = Yup.object().shape({
        curso: Yup.string().required("Este campo es obligatorio"),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:8800/curso", data).then((response) => {
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
                    <Link to="/scaner" className="addadmin-page-btn">Escaner QR</Link>
                    <Link to="/" className="addadmin-page-btn">Cerrar Sesion</Link>
                    
                </div>
            </header>
            <main className="addadmin-page-main-content">
                <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                    <Form>
                        <div className="form-group">
                            <label className="form-label" htmlFor="curso">Curso:</label>
                            <Field
                                className="form-input"
                                id="curso"
                                name="curso"
                                placeholder="Ej: 1A"
                            />
                        </div>
                        <button type="submit" className="form-button">Crear curso</button>
                    </Form>
                </Formik>
            </main>
        </div>
  )
}

export default Addcurso