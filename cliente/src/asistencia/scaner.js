import React, { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from "axios";
import { Link } from "react-router-dom";
import "./scaner.css";
import Header from '../components/header';

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

  const enviarCorreo = async (datos) => {
    try {
      const response = await axios.post("http://localhost:8800/mailer/send-test-email", datos);
      console.log("Correo enviado:", response.data);
    } catch (error) {
      console.error("Error al enviar correo:", error);
    }
  };

  useEffect(() => {
    if (isCameraActive) {
      codeReader.current
        .decodeFromVideoDevice(null, videoRef.current, (result) => {
          if (result) {
            try {
              const parsedData = JSON.parse(result.text); // Convierte el texto en un objeto
              setAlumno(parsedData);
              enviarCorreo(parsedData);
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
      <Header />

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
