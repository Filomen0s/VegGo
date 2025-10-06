import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import FamiliaVeggo from './pages/FamiliaVeggo.js'
import Home from './pages/Home.js'
import Cadastro from './pages/Cadastro.js'

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
