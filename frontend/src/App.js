import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "main/pages/HomePage";


import "bootstrap/dist/css/bootstrap.css";


function App() {

  return (
    <BrowserRouter basename="/demo-react-example">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
