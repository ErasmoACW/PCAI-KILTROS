import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './alumnos.css';

const Alumnos = () => {
    const [listofalumnos, setlistofalumnos] = useState([])

    useEffect(() => {
        axios.get("http://localhost:8800/alumnos").then((response) =>{
            setlistofalumnos(response.data)
        });
    }, []);
    return(
    <div>
        {listofalumnos.map((value, key) => {
            return(
                <div>
                    <div> {value.id_alumno} </div>
                    <div> {value.nombre} </div>    
                    <div> {value.apellido_1} </div>    
                    <div> {value.apellido_2} </div>  
                    <div> {value.rut} </div>  
                    <div> {value.correo_ap} </div>        
                    <div> {value.nombre_ap} </div>    
                    <div> {value.apellido_ap} </div>
                    <div> {value.curso} </div>        
                </div>
            )
        })}
    </div> 
    );
};

export default Alumnos;