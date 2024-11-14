import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Home from "./home/home";
import Alumnos from "./alumnos/alumnos";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/alumnos" element={<Alumnos />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
