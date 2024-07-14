// app.js (o donde tengas configurado tu servidor)
import express from 'express';
import mysql from 'mysql2/promise';
import db from './config/database.js';

const app = express();

app.get('/api/consultarTexto', async (req, res) => {
  const { texto } = req.query;
  let connection;

  try {
    connection = await mysql.createConnection(db);
    const [result] = await connection.execute('SELECT imagen_palabra FROM Palabras WHERE palabra = ?', [texto]);
    console.log(result);
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
