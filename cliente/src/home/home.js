import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleSendTestEmail = async () => {
        try {
          const response = await fetch('http://localhost:8800/api/send-test-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const data = await response.json();
          if (response.ok) {
            alert(data.message);  // Mostrar mensaje de éxito
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          alert('Error al enviar el correo: ' + error.message);  // Mostrar error
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');  // Eliminar el token
        navigate('/');  // Redirigir al home o login
    };

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
                    {/* Botón de cerrar sesión con el evento handleLogout */}
                    <button onClick={handleLogout} className="home-btn">Cerrar Sesión</button>
                </div>
            </header>

            {/* Main content */}
            <main className="home-main-content">
                <div className="home-console-container">
                    <button onClick={handleSendTestEmail}>Enviar Correo de Prueba</button>
                    <p>Consola en tiempo real en desarrollo.....</p>
                </div>
            </main>
        </div>
    );
};

export default Home;

