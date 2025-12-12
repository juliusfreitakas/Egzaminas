const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get('/renginiai', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM renginiai');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/renginiai', async (req, res) => {
  try {
    const { pavadinimas, data } = req.body;
    await db.query('INSERT INTO renginiai (pavadinimas, data) VALUES (?, ?)', [pavadinimas, data]);
    res.sendStatus(201);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/renginiai/:id', async (req, res) => {
  try {
    await db.query('DELETE FROM renginiai WHERE id = ?', [req.params.id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveris veikia ant porto ${PORT}`));
