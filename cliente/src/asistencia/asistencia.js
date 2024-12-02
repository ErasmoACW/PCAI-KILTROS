import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./asistencia.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/header';

function Asistencia() {
    const getCurrentMonth = () => {
        const date = new Date();
        const month = date.getMonth() + 1; // Months are 0-based in JavaScript
        return month < 10 ? `0${month}` : `${month}`; // Format to MM
    };

    const [fechasUnicas, setFechasUnicas] = useState([]);
    const [fechasFiltered, setFechasFiltered] = useState([]);
    const [dataTransformada, setDataTransformada] = useState({});
    const [searchTerm, setSearchTerm] = useState(getCurrentMonth());
    const navigate = useNavigate();

    const convertirAsistencia = (valor) => {
        switch (valor) {
            case 1:
                return <FontAwesomeIcon icon={faCheck} style={{ color: "green" }} />; // Ícono de "Presente"
            case 2:
                return <FontAwesomeIcon icon={faX} style={{ color: "red" }} />; // Ícono de "Ausente"
            case 3:
                return <FontAwesomeIcon icon={faCheck} style={{ color: "orange" }} />; // Ícono de "Justificado"
            default:
                return "-";
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  // Eliminar el token
        navigate('/');  // Redirigir al home o login
    };

    useEffect(() => {
        axios.get("http://localhost:8800/asistencia").then((response) => {
            const data = response.data;

            const fechas = [
                ...new Set(data.map((asistencia) => asistencia.fecha.fecha)),
            ].sort();
            setFechasUnicas(fechas);

            const transformada = {};
            data.forEach((asistencia) => {
                const nombreCompleto = `${asistencia.alumno.nombre} ${asistencia.alumno.apellido_1} ${asistencia.alumno.apellido_2}`;
                const fecha = asistencia.fecha.fecha;

                if (!transformada[nombreCompleto]) {
                    transformada[nombreCompleto] = {};
                }

                transformada[nombreCompleto][fecha] = convertirAsistencia(asistencia.asistencias);
            });
            setDataTransformada(transformada);
        });
    }, []);

    useEffect(() => {
        const results = fechasUnicas.filter((fecha) =>
            `${fecha}`.substring(5, 7).includes(searchTerm)
        );
        setFechasFiltered(results);
    }, [searchTerm, fechasUnicas]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="asistencia-page-container">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="asistencia-page-main-content">
                
                <div className="asistencia-page-search-actions">
                    <h1 className="asistencia-title">Registro de Asistencia</h1>
                    <select
                        className="asistencia-page-search-bar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    >
                        <option value='01'>Enero</option>
                        <option value='02'>Febrero</option>
                        <option value='03'>Marzo</option>
                        <option value='04'>Abril</option>
                        <option value='05'>Mayo</option>
                        <option value='06'>Junio</option>
                        <option value='07'>Julio</option>
                        <option value='08'>Agosto</option>
                        <option value='09'>Septiembre</option>
                        <option value='10'>Octubre</option>
                        <option value='11'>Noviembre</option>
                        <option value='12'>Diciembre</option>
                    </select>
                </div>

                <div className="asistencia-page-table-container">
                    <table className="asistencia-page-table">
                        <thead>
                            <tr>
                                <th>Nombre completo</th>
                                {fechasFiltered.map((fecha) => (
                                    <th key={fecha}>{fecha.substring(8, 10)}/{fecha.substring(5, 7)}</th>
                                ))}
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(dataTransformada).map(([nombreCompleto, asistencias]) => (
                                <tr key={nombreCompleto}>
                                    <td>{nombreCompleto}</td>
                                    {fechasFiltered.map((fecha) => (
                                        <td key={fecha} className="asistencia-page-cell">
                                            {asistencias[fecha] || "-"}
                                        </td>
                                    ))}
                                    <td>
                                        <Link to={`/EditAsistencia/${nombreCompleto}%20${searchTerm}`} className="asistencia-page-edit-btn">Editar</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default Asistencia;
