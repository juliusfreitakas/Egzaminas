import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPuslapis() {
  const [renginiai, setRenginiai] = useState([]);
  const [pavadinimas, setPavadinimas] = useState('');
  const [data, setData] = useState('');

  const gautiRenginius = () => {
    axios.get('/api/renginiai')
      .then(res => setRenginiai(res.data))
      .catch(err => console.error(err));
  }

  useEffect(() => {
    gautiRenginius();
  }, []);

  const pridetiRengini = () => {
    axios.post('/api/renginiai', { pavadinimas, data })
      .then(() => {
        setPavadinimas('');
        setData('');
        gautiRenginius();
      })
      .catch(err => console.error(err));
  }

  const istrintiRengini = (id) => {
    axios.delete(`/api/renginiai/${id}`)
      .then(() => gautiRenginius())
      .catch(err => console.error(err));
  }

  return (
    <div>
      <h1>Admin Puslapis</h1>
      <input placeholder="Pavadinimas" value={pavadinimas} onChange={e => setPavadinimas(e.target.value)} />
      <input type="date" value={data} onChange={e => setData(e.target.value)} />
      <button onClick={pridetiRengini}>Pridėti Renginį</button>

      <ul>
        {renginiai.map(r => (
          <li key={r.id}>
            {r.pavadinimas} - {r.data} 
            <button onClick={() => istrintiRengini(r.id)}>Ištrinti</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
