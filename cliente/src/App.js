import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./home/home";
import Alumnos from "./alumnos/alumnos";
import Addalumnos from "./alumnos/addalumnos";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/alumnos" element={<Alumnos />} />
          <Route path="/Addalumnos" element={<Addalumnos />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
