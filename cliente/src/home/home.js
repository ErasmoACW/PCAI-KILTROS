import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                <div className="home-logo">PCAI</div>
                <div className="home-buttons">
                    <Link to="/" className="home-btn">Home</Link>
                    <Link to="/alumnos" className="home-btn">Alumnos</Link>
                    <Link to="/asistencia" className="home-btn">Asistencia</Link>
                </div>
            </header>

            {/* Main content */}
            <main className="home-main-content">
                <div className="home-console-container">
                    <p>Consola en tiempo real</p>
                </div>
            </main>
        </div>
    );
};

export default Home;
