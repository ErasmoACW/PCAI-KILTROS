//Rutas privadas
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const isAuth = !!localStorage.getItem('token'); // Comprobar si hay token

    return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
