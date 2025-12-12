const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, role_id } = req.body;
  const db = req.app.locals.db;

  try {
    const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existing.length > 0) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password, role_id) VALUES (?, ?, ?)', [email, hashedPassword, role_id || 2]);

    res.status(201).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const db = req.app.locals.db;

  try {
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (users.length === 0) return res.status(400).json({ message: 'Wrong email or password' });

    const user = users[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Wrong email or password' });

    const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
