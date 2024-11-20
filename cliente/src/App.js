import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./home/home";
import Alumnos from "./alumnos/alumnos";
import Addalumnos from "./alumnos/addalumnos";
import Editalumnos from "./alumnos/editalumnos";
import Asistencia from "./asistencia/asistencia";
import Login from "./login/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/Addalumnos" element={<Addalumnos />} />
          <Route path="/Editalumnos/:id_alumno" element={<Editalumnos />} />
          <Route path="/Asistencia" element={<Asistencia />} />
          <Route path="/Login" element={<Login />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
