import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const [asistencias, setAsistencias] = useState([]); // Estado para almacenar las asistencias
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Función para obtener asistencias desde el servidor
    const fetchAsistencias = async () => {
      try {
        const response = await axios.get('http://localhost:8800/asistencia'); // Endpoint de asistencias
        setAsistencias(response.data); // Actualizar el estado con los datos obtenidos
      } catch (err) {
        console.error('Error al obtener asistencias:', err);
        setError('Hubo un problema al cargar las asistencias');
      }
    };

    fetchAsistencias();
    // Actualizar periódicamente las asistencias cada 10 segundos
    const interval = setInterval(fetchAsistencias, 10000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar el componente
  }, []);

  // Manejo de cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/'); // Redirigir al home o login
  };

  // Efecto para establecer la conexión SSE

  return (
    <div className="home-container">
      {/* Header */}
      <header className="home-header">
        <div className="home-logo">PCAI</div>
        <div className="home-buttons">
          <Link to="/home" className="home-btn">Home</Link>
          <Link to="/admin" className="home-btn">Admins</Link>
          <Link to="/alumnos" className="home-btn">Alumnos</Link>
          <Link to="/asistencia" className="home-btn">Asistencia</Link>
          <Link to="/scaner" className="home-btn">Escaner QR</Link>
          <button onClick={handleLogout} className="home-btn">Cerrar Sesión</button>
        </div>
      </header>

      {/* Main content */}
      <main className="home-main-content">
        <div className="home-console-container">
          <h2>Registro de Asistencias</h2>
          {error && <p className="error-message">{error}</p>} {/* Mostrar errores si ocurren */}
          <div className="home-terminal">
            {asistencias.map((asistencia, index) => (
              <div key={index} className="home-terminal-line">
                <span>
                  {`[${new Date().toLocaleTimeString()}]`} El/La estudiante {asistencia.alumno.nombre}{' '}
                  {asistencia.alumno.apellido_1} {asistencia.alumno.apellido_2} esta {asistencia.asistencias ? 'Presente' : 'Ausente'} con fecha{' '}
                  {asistencia.fecha.fecha} 
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
