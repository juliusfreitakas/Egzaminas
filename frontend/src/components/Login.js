import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [el_pastas, setElPastas] = useState('');
  const [slaptazodis, setSlaptazodis] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5001/auth/login', {
        el_pastas,
        slaptazodis,
      });

      localStorage.setItem('token', res.data.token);

      alert(`Sėkmingai prisijungėte kaip ${res.data.vardas}`);
      setElPastas('');
      setSlaptazodis('');
    } catch (err) {
      alert(err.response?.data?.error || 'Klaida prisijungiant');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="El. paštas"
        value={el_pastas}
        onChange={(e) => setElPastas(e.target.value)}
      />
      <input
        type="password"
        placeholder="Slaptažodis"
        value={slaptazodis}
        onChange={(e) => setSlaptazodis(e.target.value)}
      />
      <button onClick={handleLogin}>Prisijungti</button>
    </div>
  );
}

export default Login;
