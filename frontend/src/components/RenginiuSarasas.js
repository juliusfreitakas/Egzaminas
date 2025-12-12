import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RenginiuSarasas() {
  const [renginiai, setRenginiai] = useState([]);

  useEffect(() => {
    axios.get('/api/renginiai')
      .then(res => setRenginiai(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Vykstantys renginiai</h1>
      <ul>
        {renginiai.map(r => (
          <li key={r.id}>{r.pavadinimas} - {r.data}</li>
        ))}
      </ul>
    </div>
  );
}
