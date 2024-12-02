import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './admin.css';
import Header from '../components/header';

const Admin = () => {
    const [listofadmin, setlistofadmin] = useState([]);
    let navigate = useNavigate();

    const deleteAdmin = (id_admin) => {
        axios.delete(`http://localhost:8800/admin/${id_admin}`)
            .then(response => {
                console.log("Admin eliminado:", response.data);
                setlistofadmin(listofadmin.filter(admin => admin.id_admin !== id_admin));
            });
    };

    useEffect(() => {
        axios.get("http://localhost:8800/admin").then((response) => {
            setlistofadmin(response.data);
        });
    }, []);

    return (
        <div className="admin-page-container">
            {/* Header */}
            <Header/>
           

            {/* Main Content */}
            <main className="admin-page-main-content">
                <div className="admin-page-header-container">
                    <h1 className="admin-page-title">Lista de Administradores</h1>
                    <Link to="/addadmin" className="admin-page-btn">Agregar Admin</Link>
                </div>
                <table className="admin-page-table">
                    <thead>
                        <tr>
                            <th>ID Admin</th>
                            <th>Usuario</th>
                            
                            <th>Editar</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listofadmin.map((admin) => (
                            <tr key={admin.id_admin}>
                                <td>{admin.id_admin}</td>
                                <td>{admin.usuario}</td>
                                
                                <td>
                                    <button
                                        className="admin-page-edit-btn"
                                        onClick={() => navigate(`/EditAdmin/${admin.id_admin}`)}
                                    >
                                        Editar
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="admin-page-delete-btn"
                                        onClick={() => deleteAdmin(admin.id_admin)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default Admin;

