import React, { useEffect, useState } from 'react';
import axios from 'axios';

function RenginiuSarasas() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/api/renginiai')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Renginiai</h2>
      <ul>
        {events
          .filter(e => e.name && e.date)
          .map(e => (
            <li key={e.id}>{e.name} - {e.date}</li>
          ))}
      </ul>
    </div>
  );
}

export default RenginiuSarasas;
