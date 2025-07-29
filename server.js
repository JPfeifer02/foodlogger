const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Database connection
require('dotenv').config();
const sql = require('mssql');
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
      encrypt: true,
      trustServerCertificate: false,
    },
  };
sql.connect(config)
  .then(() => console.log('Connected to Azure SQL Database'))
  .catch(err => console.error('Database connection failed:', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
 
  // Route to log food
app.post('/api/log', async (req, res) => {
  const { food, calories } = req.body;
  try {
    await sql.connect(dbConfig);
    await sql.query`
      INSERT INTO FoodLog (food, calories, date)
      VALUES (${food}, ${calories}, GETDATE())
    `;
    res.status(201).send('Food logges!');
  } catch (err) {
    console.error('Error logging food:', err);
    res.status(500).send('Error logging food');
  }
}

)
// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
