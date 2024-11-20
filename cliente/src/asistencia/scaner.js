import React, { useRef, useState, useEffect } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import axios from 'axios';

function Scanner() {
  const [alumno, setAlumno] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const videoRef = useRef(null);
  const codeReader = useRef(new BrowserMultiFormatReader());

  const enviarAsistencia = async (datos) => {
    try {
      const response = await axios.post("http://localhost:8800/asistencia/add_asistencia", datos);
      console.log('Asistencia registrada:', response.data);
    } catch (error) {
      console.error('Error al registrar asistencia:', error);
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
    <div>
      <h1>QR Scanner</h1>
      <button onClick={handleToggleCamera}>
        {isCameraActive ? "Detener" : "Iniciar"}
      </button>
      <video ref={videoRef} />
      <p>Datos: {alumno ? JSON.stringify(alumno) : "No hay datos"}</p>
    </div>
  );
}

export default Scanner;