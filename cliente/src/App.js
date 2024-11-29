import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home/home";
import Alumnos from "./alumnos/alumnos";
import Addalumnos from "./alumnos/addalumnos";
import Editalumnos from "./alumnos/editalumnos";
import Asistencia from "./asistencia/asistencia";
import Login from "./login/login";
import Scaner from "./asistencia/scaner";
import Admin from "./admin/admin";
import Addadmin from "./admin/addadmin";
import Editadmin from "./admin/editadmin";
import PrivateRoute from "./Components/PrivateRoute"; // Importa PrivateRoute

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* Ruta pública */}
          <Route path="/" element={<Login />} />

          {/* Rutas protegidas */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/alumnos" element={<Alumnos />} />
            <Route path="/Addalumnos" element={<Addalumnos />} />
            <Route path="/Editalumnos/:id_alumno" element={<Editalumnos />} />
            <Route path="/Admin" element={<Admin />} />
            <Route path="/Addadmin" element={<Addadmin />} />
            <Route path="/Editadmin/:id_admin" element={<Editadmin />} />
            <Route path="/Asistencia" element={<Asistencia />} />
            <Route path="/scaner" element={<Scaner />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
