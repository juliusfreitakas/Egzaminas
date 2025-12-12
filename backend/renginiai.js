const express = require('express');
const mysql = require('mysql2/promise');
const { authenticateAdmin } = require('./middleware');
require('dotenv').config();

const router = express.Router();
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT r.id, r.pavadinimas, r.data, k.pavadinimas AS kategorija FROM renginiai r LEFT JOIN kategorijos k ON r.category_id = k.id');
  res.json(rows);
});

router.post('/', authenticateAdmin, async (req, res) => {
  const { pavadinimas, data, category_id } = req.body;
  await db.query('INSERT INTO renginiai (pavadinimas, data, category_id) VALUES (?, ?, ?)', [pavadinimas, data, category_id]);
  res.status(201).json({ message: 'Renginys sukurtas' });
});

router.delete('/:id', authenticateAdmin, async (req, res) => {
  const { id } = req.params;
  await db.query('DELETE FROM renginiai WHERE id = ?', [id]);
  res.json({ message: 'Renginys ištrintas' });
});

module.exports = router;
