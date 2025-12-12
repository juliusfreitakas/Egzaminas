import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RenginiuSarasas from './components/RenginiuSarasas';
import AdminPuslapis from './components/AdminPuslapis';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ margin: '20px' }}>
          <Link to="/" style={{ marginRight: '10px' }}>Renginiai</Link>
          <Link to="/admin">Admin Puslapis</Link>
        </nav>
        <Routes>
          <Route path="/" element={<RenginiuSarasas />} />
          <Route path="/admin" element={<AdminPuslapis />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;