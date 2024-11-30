import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./home/home";

import Alumnos from "./alumnos/alumnos";
import Addalumnos from "./alumnos/addalumnos";
import Editalumnos from "./alumnos/editalumnos";

import Asistencia from "./asistencia/asistencia";
import Editasistencia from "./asistencia/editasistencia";
import Login from "./login/login";
import Scaner from "./asistencia/scaner";

import Admin from "./admin/admin";
import Addadmin from "./admin/addadmin";
import Editadmin from "./admin/editadmin";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/home" element={<Home />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/Addalumnos" element={<Addalumnos />} />
          <Route path="/Editalumnos/:id_alumno" element={<Editalumnos />} />

          <Route path="/Admin" element={<Admin />} />
          <Route path="/Addadmin" element={<Addadmin />} />
          <Route path="/Editadmin/:id_admin" element={<Editadmin />} />
          
          <Route path="/Asistencia" element={<Asistencia />} />
          <Route path="/Editasistencia/:NombreCompleto" element={<Editasistencia />} />
          <Route path="/" element={<Login />} />
          <Route path="/scaner" element = {<Scaner/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
