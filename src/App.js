import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import FamiliaVeggo from './pages/FamiliaVeggo.jsx'
import Home from './pages/Home.jsx'
import Cadastro from './pages/Cadastro.jsx'

function App() {
  return (
    <Router>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FamiliaVeggo" element={<FamiliaVeggo />} />
          <Route path="/Cadastro" element={<Cadastro />} />
        </Routes>
      </main>

    </Router>

  );
}

export default App;
