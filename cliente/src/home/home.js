import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import Header from '../components/header';

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
      <Header />

      {/* Main content */}
      <main className="home-main-content">
        <div className="home-console-container">
          <h2>Registro de Asistencias</h2>
          {error && <p className="error-message">{error}</p>} {/* Mostrar errores si ocurren */}
          <div className="home-terminal">
            {asistencias.map((asistencia, index) => (
              <div key={index} className="home-terminal-line">
                <span>
                  {`[`+asistencia.createdAt+`]`} El/La estudiante {asistencia.alumno.nombre}{' '}
                  {asistencia.alumno.apellido_1} {asistencia.alumno.apellido_2} esta {asistencia.asistencias ? 'Presente' : 'Ausente'}
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
