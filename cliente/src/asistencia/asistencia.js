import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './asistencia.css';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react'


function Asistencia() {
    const [listofasistencia, setlistofasistencia] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8800/asistencia").then((response) => {
            setlistofasistencia(response.data);
        });
    }, []);


    return (
        <div>asistencia
            <table className="alumnos-page-table">
                <thead>
                    <tr>
                        <th>Nombre Completo</th>
                        <th>Asistencia</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {listofasistencia.map((asistencia) => (
                        <tr key={asistencia.fecha}>
                            <td>{`${asistencia.alumno.nombre} ${asistencia.alumno.apellido_1} ${asistencia.alumno.apellido_2}`}</td>
                            <td>{asistencia.asistencias}</td>
                            <td>{asistencia.fecha.fecha}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Asistencia;