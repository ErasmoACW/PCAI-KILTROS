import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Verificar si hay un token existente para redirigir automáticamente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Enviar las credenciales a la ruta del backend
      const response = await axios.post('http://localhost:8800/admin', {
        username,
        password,
      });

      if (response.data.success) {
        // Guardar el token en localStorage
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      } else {
        setError('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error en la autenticación:', error);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="loginPage-container">
      <div className="loginPage-titleBox">
        <h2>Bienvenido</h2>
      </div>
      <form onSubmit={handleLogin} className="loginPage-form">
        <div className="loginPage-formGroup">
          <label htmlFor="username">
            <i className="fas fa-user"></i>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuario"
            required
          />
        </div>
        <div className="loginPage-formGroup">
          <label htmlFor="password">
            <i className="fas fa-lock"></i>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        {error && <p className="loginPage-error">{error}</p>}
        <button type="submit" className="loginPage-submitButton">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
