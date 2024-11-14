import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
    return (
        <div className="container">
            {/* Header */}
            <header className="header">
                <div className="logo">PCAI</div>
                <div className="buttons">
                    <Link to="/" className="btn">Home</Link>
                    <Link to="/alumnos" className="btn">Alumnos</Link>
                    <Link to="/asistencia" className="btn">Asistencia</Link>
                </div>
            </header>

            {/* Main content */}
            <main className="main-content">
                <div className="console-container">
                    <p>Consola en tiempo real</p>
                </div>
            </main>
        </div>
    );
};



export default Home;