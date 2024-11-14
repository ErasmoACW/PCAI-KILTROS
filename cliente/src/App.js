import { BrowserRouter, Routes, Route, } from "react-router-dom";
import home from "./home/home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          
          <Route path="/" element={<home />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
