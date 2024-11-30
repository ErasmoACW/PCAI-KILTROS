import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import SeleccionMes from "../components/SeleccionMes";



function Asistencia() {


    return (
       <div> 
        <h1 className="text-red-500"> Asistencia </h1> 
        {/* search option */}
        <div> 
            <SeleccionMes/>
        </div>


       </div>
    );
}

export default Asistencia;

