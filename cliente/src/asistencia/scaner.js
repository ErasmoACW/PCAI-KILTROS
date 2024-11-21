import React, { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from "axios";
import { Link } from "react-router-dom";
import "./scaner.css";

function Scanner() {
  const [alumno, setAlumno] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  const enviarAsistencia = async (datos) => {
    try {
      const response = await axios.post("http://localhost:8800/asistencia/add_asistencia", datos);
      console.log("Asistencia registrada:", response.data);
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
    }
  };

  useEffect(() => {
    if (isCameraActive) {
      codeReader.current
      .decodeFromVideoDevice(null, videoRef.current, (result) => {
        if (result) {
          try {
            const parsedData = JSON.parse(result.text);
            setAlumno(parsedData);
            enviarAsistencia(parsedData);
          } catch (error) {
            console.error("Error parsing QR:", error);
          }
        }
      });
    }

    return () => {
      codeReader.current.reset();
    };
  }, [isCameraActive]);

  const handleToggleCamera = () => {
    setIsCameraActive(!isCameraActive);
  };

  return (
    <div className="scanner-page-container">
      <header className="scanner-page-header">
        <div className="scanner-page-logo">PCAI</div>
        <nav className="scanner-page-buttons">
          <Link to="/home" className="scanner-page-btn">Home</Link>
          <Link to="/admin" className="scanner-page-btn">Admins</Link>
          <Link to="/alumnos" className="scanner-page-btn">Alumnos</Link>
          <Link to="/asistencia" className="scanner-page-btn">Asistencia</Link>
          <Link to="/scaner" className="scanner-page-btn">Escaner QR</Link>
          <Link to="/" className="scanner-page-btn">Cerrar Sesión</Link>
        </nav>
      </header>

      <main className="scanner-page-main-content">
        <h1 className="scanner-page-title">Escáner de QR</h1>
        <button className="scanner-page-toggle-btn" onClick={handleToggleCamera}>
          {isCameraActive ? "Detener Cámara" : "Iniciar Cámara"}
        </button>
        <video className="scanner-page-video" ref={videoRef}></video>
        <p className="scanner-page-data">
          Datos: {alumno ? JSON.stringify(alumno) : "No hay datos"}
        </p>
      </main>
    </div>
  );
}

export default Scanner;
