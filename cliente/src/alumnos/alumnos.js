import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './alumnos.css';
import Header from '../components/header';
import QRCode from 'qrcode';

const Alumnos = () => {
    const [listofalumnos, setlistofalumnos] = useState([]);
    const [filteredAlumnos, setFilteredAlumnos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [mostrarQR, setMostrarQR] = useState({});
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
            setFilteredAlumnos(response.data);
        });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

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
                id_alumno: alumno.id_alumno,
                nombre: alumno.nombre,
                apellido_1: alumno.apellido_1,
                apellido_2: alumno.apellido_2,
                nombre_ap: alumno.nombre_ap,
                apellido_ap: alumno.apellido_ap,
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
            link.download = `QR-${alumno.nombre}-${alumno.apellido_1}-${alumno.apellido_2}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error generando QR:', error);
            alert('Error al generar el código QR');
        }
    };

    return (
        <div className="alumnos-container">
            <Header />
            <main className="alumnos-main">
                <div className="alumnos-header">
                    <h1>Lista de Alumnos</h1>
                    <div className="alumnos-actions">
                        <input
                            type="text"
                            placeholder="Buscar alumno..."
                            className="alumnos-search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <Link to="/addalumnos" className="btn btn-primary">Agregar Alumnos</Link>
                    </div>
                </div>
                <div className="alumnos-table-container">
                    <table className="alumnos-table">
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
                                    <td>
                                        <button className="btn btn-edit" onClick={() => navigate(`/EditAlumnos/${alumno.id_alumno}`)}>
                                            Editar
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-delete" onClick={() => deleteAlumno(alumno.id_alumno)}>
                                            Eliminar
                                        </button>
                                    </td>
                                    <td>
                                        <button className="btn btn-qr" onClick={() => downloadQR(alumno)}>
                                            Descargar QR
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </main>
        </div>
    );
};

export default Alumnos;
