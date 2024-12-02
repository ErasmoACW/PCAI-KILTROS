import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Eliminar el token
        navigate('/'); // Redirigir al home o login
    };

    return (
        <header className="page-header">
            <div className="page-logo">PCAI</div>
            <div className="page-buttons">
                <Link to="/home" className="page-btn">Home</Link>
                <Link to="/admin" className="page-btn">Admins</Link>
                <Link to="/alumnos" className="page-btn">Alumnos</Link>
                <Link to="/asistencia" className="page-btn">Asistencia</Link>
                <Link to="/scaner" className="page-btn">Escaner QR</Link>
                <button onClick={handleLogout} className="logout-btn">Cerrar Sesión</button>
            </div>
        </header>
    );
};

export default Header;
