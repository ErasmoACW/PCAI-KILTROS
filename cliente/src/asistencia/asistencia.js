import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./asistencia.css";

function Asistencia() {
    const [listofasistencia, setlistofasistencia] = useState([]);
    const [fechasUnicas, setFechasUnicas] = useState([]);
    const [dataTransformada, setDataTransformada] = useState({});

    const convertirAsistencia = (valor) => {
        switch (valor) {
            case 1:
                return "Presente";
            case 2:
                return "Ausente";
            case 3:
                return "Justificado";
            default:
                return "-";
        }
    };

    useEffect(() => {
        axios.get("http://localhost:8800/asistencia").then((response) => {
            const data = response.data;
            setlistofasistencia(data);

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

    return (
        <div className="asistencia-page-container">
            {/* Header */}
            <header className="asistencia-page-header">
                <div className="asistencia-page-logo">PCAI</div>
                <div className="asistencia-page-buttons">
                    <Link to="/" className="asistencia-page-btn">Home</Link>
                    <Link to="/admin" className="admin-page-btn">Admins</Link>
                    <Link to="/alumnos" className="asistencia-page-btn">Alumnos</Link>
                    <Link to="/asistencia" className="asistencia-page-btn">Asistencia</Link>
                    <Link to="/login" className="home-btn">Cerrar Sesion</Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="asistencia-page-main-content">
                <h1>Registro de Asistencia</h1>
                <table className="asistencia-page-table">
                    <thead>
                        <tr>
                            <th>Nombre completo</th>
                            {fechasUnicas.map((fecha) => (
                                <th key={fecha}>{fecha}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(dataTransformada).map(([nombreCompleto, asistencias]) => (
                            <tr key={nombreCompleto}>
                                <td>{nombreCompleto}</td>
                                {fechasUnicas.map((fecha) => (
                                    <td key={fecha} className="asistencia-page-cell">
                                        {asistencias[fecha] || "-"}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default Asistencia;
