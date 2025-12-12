import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';

function AdminPuslapis() {
  const [events, setEvents] = useState([]);
  const [pavadinimas, setPavadinimas] = useState('');
  const [data, setData] = useState('');
  const [category_id, setCategoryId] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        if (decoded.role_id === 1) setIsAdmin(true);
      } catch (err) {
        console.error('Invalid token');
      }
    }
  }, []);

  const fetchEvents = () => {
    axios.get('http://localhost:5001/renginiai')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchEvents(); }, []);

  const addEvent = () => {
    const token = localStorage.getItem('token');
    axios.post(
      'http://localhost:5001/renginiai',
      { pavadinimas, data, category_id },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(() => {
      setPavadinimas('');
      setData('');
      fetchEvents();
    }).catch(err => alert(err.response?.data?.error || 'Klaida pridedant renginį'));
  };

  const deleteEvent = (id) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:5001/renginiai/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(() => fetchEvents())
      .catch(err => alert(err.response?.data?.error || 'Klaida trinant renginį'));
  };

  if (!isAdmin) return <h2>Neturite prieigos prie šio puslapio</h2>;

  return (
    <div>
      <h2>Admin Puslapis</h2>
      <div>
        <input placeholder="Pavadinimas" value={pavadinimas} onChange={e => setPavadinimas(e.target.value)} />
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <input type="number" value={category_id} onChange={e => setCategoryId(e.target.value)} />
        <button onClick={addEvent}>Pridėti renginį</button>
      </div>
      <ul>
        {events.map(e => (
          <li key={e.id}>{e.pavadinimas} - {e.data} ({e.kategorija})
            <button onClick={() => deleteEvent(e.id)}>Ištrinti</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPuslapis;
