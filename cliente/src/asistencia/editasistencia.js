import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './editasistencia.css';
import Header from '../components/header';

const Editasistencia = () => {
    let { NombreCompleto } = useParams();

    const [Data, setData] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});

    const mapToNumericStatus = (status) => {
        switch (status) {
            case "Presente": return 1;
            case "Ausente": return 2;
            case "Justificado": return 3;
            default: return null;
        }
    };

    const convertirAsistencia = (valor) => {
        switch (valor) {
            case 1: return "Presente";
            case 2: return "Ausente";
            case 3: return "Justificado";
            default: return "-";
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:8800/asistencia/nombre/${NombreCompleto}`).then((response) => {
            const fetchedData = response.data;

            const processedData = fetchedData.map((asistencia) => ({
                ...asistencia,
                asistencias: convertirAsistencia(asistencia.asistencias),
            }));

            setData(processedData);

            const initialEditedData = {};
            processedData.forEach((row) => {
                initialEditedData[row.id_asistencia] = { ...row };
            });
            setEditedData(initialEditedData);
        });
    }, [NombreCompleto]);

    const handleInputChange = (e, id, field) => {
        setEditedData((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                [field]: e.target.value,
            },
        }));
    };

    const toggleEditSave = async () => {
        if (isEditing) {
            try {
                const updatedData = Object.values(editedData).map((row) => ({
                    ...row,
                    asistencias: mapToNumericStatus(row.asistencias),
                }));

                await axios.put(`http://localhost:8800/asistencia/${Object.values(editedData)[0]?.alumno.id_alumno}`, updatedData);
                setData(updatedData.map((row) => ({
                    ...row,
                    asistencias: convertirAsistencia(row.asistencias),
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
        <div className="edit-asistencia-page-container">
            <Header />
            <main className="edit-asistencia-page-main-content">
                <h1 className="edit-asistencia-title">
                   Editor de Registros
                </h1>
                <table className="edit-asistencia-table">
                    <thead>
                        <tr>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.map((asi) => (
                            <tr key={asi.id_asistencia}>
                                <td>{asi.fecha.fecha.substring(0, 10)}</td>
                                <td>{isEditing ? (
                                    <select 
                                        value={editedData[asi.id_asistencia]?.asistencias || asi.asistencias}
                                        onChange={(e) => handleInputChange(e, asi.id_asistencia, 'asistencias')}
                                        className="edit-asistencia-select">
                                        <option value='Presente'>Presente</option>
                                        <option value='Ausente'>Ausente</option>
                                        <option value='Justificado'>Justificado</option>
                                    </select>
                                ) : (asi.asistencias)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="edit-asistencia-form-button" onClick={toggleEditSave}>
                        {isEditing ? 'Guardar Cambios' : 'Editar'}
                    </button>
            </main>
        </div>
    );
};

export default Editasistencia;
