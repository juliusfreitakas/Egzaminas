const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const authRoutes = require('./auth');
const renginiaiRoutes = require('./renginiai');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'theanimefreak123',
  database: 'renginiu_db',
});

db.connect((err) => {
  if (err) console.log('Database connection error:', err);
  else console.log('Connected to MySQL database');
});

app.locals.db = db;

app.use('/api/auth', authRoutes);
app.use('/api/renginiai', renginiaiRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));