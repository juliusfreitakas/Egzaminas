import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import RenginiuSarasas from './components/RenginiuSarasas';
import AdminPuslapis from './components/AdminPuslapis';
import Login from './components/Login';
import SignUp from './components/SignUp';

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    alert('Atsijungta sėkmingai');
    navigate('/login');
  };

  return (
    <nav style={{ margin: '20px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Renginiai</Link>
      <Link to="/admin" style={{ marginRight: '10px' }}>Admin Puslapis</Link>
      {!token && <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>}
      {!token && <Link to="/signup">Sign Up</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<RenginiuSarasas />} />
        <Route path="/admin" element={<AdminPuslapis />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
