import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './alumnos.css';
import QRCode from 'qrcode';

const Alumnos = () => {
    const [listofalumnos, setlistofalumnos] = useState([]);
    const [filteredAlumnos, setFilteredAlumnos] = useState([]); // Para almacenar los alumnos filtrados
    const [searchTerm, setSearchTerm] = useState(""); // Estado para la barra de búsqueda
    const [mostrarQR, setMostrarQR] = useState({}); // Estado para controlar cuándo mostrar el QR
    let navigate = useNavigate();

    const deleteAlumno = (id_alumno) => {
        axios.delete(`http://localhost:8800/alumnos/${id_alumno}`)
            .then(response => {
                console.log("Alumno eliminado:", response.data);
                setlistofalumnos(listofalumnos.filter(alumno => alumno.id_alumno !== id_alumno));
            });
    };

    useEffect(() => {
        axios.get("http://localhost:8800/alumnos").then((response) => {
            setlistofalumnos(response.data);
            setFilteredAlumnos(response.data); // Inicializa los alumnos filtrados
        });
    }, []);

    // Filtrar alumnos en tiempo real según el término de búsqueda
    useEffect(() => {
        const results = listofalumnos.filter((alumno) =>
            `${alumno.nombre} ${alumno.apellido_1} ${alumno.apellido_2}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
        setFilteredAlumnos(results);
    }, [searchTerm, listofalumnos]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const downloadQR = async (alumno) => {
        try {
            const data = JSON.stringify({
                id: alumno.id_alumno,
                nombre: alumno.nombre,
                apellido_1: alumno.apellido_1,
                apellido_2: alumno.apellido_2,
                correo_ap: alumno.correo_ap,
                curso: alumno.curso
            });

            const canvas = document.createElement('canvas');
            canvas.width = 120;
            canvas.height = 120;

            await QRCode.toCanvas(canvas, data, {
                width: 120,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#ffffff'
                },
                errorCorrectionLevel: 'H'
            });

            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `QR-${alumno.nombre}-${alumno.apellido_1}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generando QR:', error);
            alert('Error al generar el código QR');
        }
    };

    return (
        <div className="alumnos-page-container">
            {/* Header */}
            <header className="alumnos-page-header">
                <div className="alumnos-page-logo">PCAI</div>
                <div className="alumnos-page-buttons">
                    <Link to="/home" className="alumnos-page-btn">Home</Link>
                    <Link to="/admin" className="alumnos-page-btn">Admins</Link>
                    <Link to="/alumnos" className="alumnos-page-btn">Alumnos</Link>
                    <Link to="/asistencia" className="alumnos-page-btn">Asistencia</Link>
                    <Link to="/scaner" className="alumnos-page-btn">Escaner QR</Link>
                    <Link to="/" className="alumnos-page-btn">Cerrar Sesion</Link>
                </div>
            </header>
            <main className="alumnos-page-main-content">
                <div className="alumnos-page-filter-container">
                    <h1>Lista de Alumnos</h1>
                    <div className="alumnos-page-search-actions">
                        <input
                            type="text"
                            placeholder="Buscar alumno..."
                            className="alumnos-page-search-bar"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Link to="/addalumnos" className="alumnos-page-btn">Agregar Alumnos</Link>
                    </div>
                </div>

                <table className="alumnos-page-table">
                    <thead>
                        <tr>
                            <th>ID Alumno</th>
                            <th>Nombre</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>RUT</th>
                            <th>Correo Apoderado</th>
                            <th>Nombre Apoderado</th>
                            <th>Apellido Apoderado</th>
                            <th>Curso</th>
                            <th>Editar</th>
                            <th>Eliminar</th>
                            <th>QR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAlumnos.map((alumno) => (
                            <tr key={alumno.id_alumno}>
                                <td>{alumno.id_alumno}</td>
                                <td>{alumno.nombre}</td>
                                <td>{alumno.apellido_1}</td>
                                <td>{alumno.apellido_2}</td>
                                <td>{alumno.rut}</td>
                                <td>{alumno.correo_ap}</td>
                                <td>{alumno.nombre_ap}</td>
                                <td>{alumno.apellido_ap}</td>
                                <td>{alumno.curso}</td>
                                <td><button className="alumnos-page-edit-btn" onClick={() => navigate(`/EditAlumnos/${alumno.id_alumno}`)}>Editar</button></td>
                                <td><button className="alumnos-page-delete-btn" onClick={() => deleteAlumno(alumno.id_alumno)}>Eliminar</button></td>
                                <td>
                                    <button
                                        className="alumnos-page-qr-btn"
                                        onClick={() => downloadQR(alumno)}
                                    >
                                        Descargar QR
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Alumnos;
