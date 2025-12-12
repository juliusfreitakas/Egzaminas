import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
  const [vardas, setVardas] = useState('');
  const [el_pastas, setElPastas] = useState('');
  const [slaptazodis, setSlaptazodis] = useState('');

  const handleSignUp = async () => {
    try {
      const res = await axios.post('http://localhost:5001/auth/signup', {
        vardas,
        el_pastas,
        slaptazodis,
      });
      alert(res.data.message);
      setVardas('');
      setElPastas('');
      setSlaptazodis('');
    } catch (err) {
      alert(err.response?.data?.error || 'Klaida registruojantis');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Vardas"
        value={vardas}
        onChange={(e) => setVardas(e.target.value)}
      />
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
      <button onClick={handleSignUp}>Registruotis</button>
    </div>
  );
}

export default SignUp;
