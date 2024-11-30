import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import './editasistencia.css';

const Editasistencia = () => {
    let { NombreCompleto } = useParams();
    const navigate = useNavigate();

    const [Data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});

    // Helper function to map status values to numbers
    const mapToNumericStatus = (status) => {
        switch (status) {
            case "Presente": return 1;
            case "Ausente": return 2;
            case "Justificado": return 3;
            default: return null;
        }
    };

    // Switch que recibe un valor y retorna el estado de asistencia correspondiente
    const convertirAsistencia = (valor) => {
        switch (valor) {
            case 1: return "Presente";
            case 2: return "Ausente";
            case 3: return "Justificado";
            default: return "-";
        }
    };

    // useEffect que maneja la recepción de datos cuando se carga la pagina
    useEffect(() => {
        axios.get(`http://localhost:8800/asistencia/nombre/${NombreCompleto}`).then((response) => {
            const fetchedData = response.data;

            // Procesa los datos mediante un mapeo
            const processedData = fetchedData.map((asistencia) => ({
                ...asistencia,
                asistencias: convertirAsistencia(asistencia.asistencias),
            }));

            setData(processedData);

            //Inicializa 'editedData' con valores actuales
            const initialEditedData = {};
            processedData.forEach((row) => {
                initialEditedData[row.id_asistencia] = { ...row };
            });
            setEditedData(initialEditedData);
        });
    }, [NombreCompleto]);

    // Handle input change for the table
    const handleInputChange = (e, id, field) => {
        setEditedData((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: e.target.value,
            },
        }));
    };

    // Cambia entre editar y guardar cambios
    const toggleEditSave = async () => {
        if (isEditing) {
            // Save changes to the backend
            try {
                const updatedData = Object.values(editedData).map((row) => ({
                    ...row,
                    asistencias: mapToNumericStatus(row.asistencias),
                }));

                await axios.put(`http://localhost:8800/asistencia/${Object.values(editedData)[0]?.alumno.id_alumno}`, updatedData);
                setData(updatedData.map((row) => ({
                    ...row,
                    asistencias: convertirAsistencia(row.asistencias), // Convert back for display
                })));
                alert('Changes saved successfully!');
            } catch (error) {
                console.error('Error saving data:', error);
                alert('Failed to save changes.');
            }
        }
        setIsEditing(!isEditing);
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
                {console.log(Object.values(editedData)[0]?.asistencias)}
                <h1><button className="editalumnos-form-button" onClick={toggleEditSave}>
                    {isEditing ? 'Guardar Cambios' : 'Editar'}
                </button></h1>
                <table className="admin-page-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((asi) => (
                            <tr key={asi.id_asistencia}>
                                <td>{asi.fecha.fecha.substring(0,10)}</td>
                                <td>{isEditing ? (
                                    <select 
                                        value={Object.values(editedData)[asi.id_asistencia]?.asistencias || asi.asistencias}
                                        onChange={(e) => handleInputChange(e, asi.id_asistencia, asi.asistencias)}>
                                        <option value='Presente'>Presente</option>
                                        <option value='Ausente'>Ausente</option>
                                        <option value='Justificado'>Justificado</option>
                                    </select>) : (asi.asistencias)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Editasistencia;
