import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './alumnos.css';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'

const Alumnos = () => {
    const [listofalumnos, setlistofalumnos] = useState([]);
    const [mostrarQR, setMostrarQR] = useState({}); // Estado para controlar cuándo mostrar el QR


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
            const qrStates = response.data.reduce((acc, alumno) => {
                acc[alumno.rut] = false; 
                return acc;
              }, {});
              setMostrarQR(qrStates);
        });
    }, []);

    const handleMostrarQR = (rut) => {
        setMostrarQR((prevState) => ({
          ...prevState,
          [rut]: !prevState[rut],
        }));
      };

    return (
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
            <main className="alumnos-page-main-content">
                <h1>Lista de Alumnos</h1>
                <div className="alumnos-page-filter-container">
                    <input
                        type="text"
                        className="alumnos-page-search-input"
                        placeholder="Buscar por nombre o apellidos"
                    />
                    <div className="alumnos-page-actions">
                        <Link to="/addalumnos" className="alumnos-page-btn">Agregar Alumnos</Link>

                        <select className="alumnos-page-course-select">
                            <option value="">Todos los cursos</option>
                            <option value="1°">1°</option>
                            <option value="2°">2°</option>
                            <option value="3°">3°</option>
                            <option value="4°">4°</option>
                        </select>
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
                        {listofalumnos.map((alumno) => (
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
                                <td><button className="alumnos-page-edit-btn">Editar</button></td>
                                <td><button className="alumnos-page-delete-btn" onClick={() => deleteAlumno(alumno.id_alumno)}>Eliminar</button></td>
                                
                                <td>
                                    <button className="alumnos-page-qr-btn" onClick={() => handleMostrarQR(alumno.rut)}>
                                        {mostrarQR[alumno.rut] ? "Ocultar QR" : "Mostrar QR"}
                                    </button>
                                    {mostrarQR[alumno.rut] && (
                                        <QRCodeSVG
                                            value={JSON.stringify(alumno)}
                                            size={120}
                                            imageSettings={{
                                                src: "https://cdn.discordapp.com/attachments/1274470619597111439/1307129763797925969/LogoKiltros.png?ex=67392ef4&is=6737dd74&hm=a064702532b5b68fc1ef8d189830e8b8700c2546667e288a792bdca8574624c4&",
                                                height: 24, // Altura en píxeles
                                                width: 24, // Ancho en píxeles
                                                excavate: true,
                                            }}
                                        />
                                    )}
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
