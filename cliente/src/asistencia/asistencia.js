import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import "./asistencia.css";

function Asistencia() {
    const [fechasUnicas, setFechasUnicas] = useState([]);
    const [fechasFiltered, setFechasFiltered] = useState([]);
    const [dataTransformada, setDataTransformada] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    const convertirAsistencia = (valor) => {
        switch (valor) {
            case 1: return "Presente";
            case 2: return "Ausente";
            case 3: return "Justificado";
            default: return "-";
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
            setFechasFiltered(fechas);

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
            {console.log(fechasUnicas.filter((fecha) => `${fecha}`.substring(5, 7)))}
            {/* Header */}
            <header className="asistencia-page-header">
                <div className="asistencia-page-logo">PCAI</div>
                <div className="asistencia-page-buttons">
                    <Link to="/home" className="asistencia-page-btn">Home</Link>
                    <Link to="/admin" className="asistencia-page-btn">Admins</Link>
                    <Link to="/alumnos" className="asistencia-page-btn">Alumnos</Link>
                    <Link to="/asistencia" className="asistencia-page-btn">Asistencia</Link>
                    <Link to="/scaner" className="asistencia-page-btn">Escaner QR</Link>
                    {/* Botón de Cerrar Sesión con la función handleLogout */}
                    <button onClick={handleLogout} className="home-btn">Cerrar Sesión</button>
                </div>
            </header>

            {/* Main Content */}
            <main className="asistencia-page-main-content">
                <h1>Registro de Asistencia</h1>
                <div className="alumnos-page-search-actions">
                        <select className="alumnos-page-search-bar"
                            placeholder="Seleccione el mes"
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
                        <Link to="/addalumnos" className="alumnos-page-btn">Agregar Alumnos</Link>
                    </div>
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
                                <td><Link to={`/EditAsistencia/${nombreCompleto}`} className="alumnos-page-edit-btn">Editar</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}

export default Asistencia;

