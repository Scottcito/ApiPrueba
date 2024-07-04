import sqlite3 from 'sqlite3';
const { Database } = sqlite3.verbose();

// Crear una nueva base de datos (o abrir una existente)
let db = new Database('./bbdd.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Conectado a la base de datos SQLite.');
  
  db.each(`SELECT  * FROM Palabras`, (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`${row.id}\t${row.Nombre}\t${row.imagen}`);
  });
      // Cerrar la conexión a la base de datos
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Cerrada la conexión a la base de datos SQLite.');
      });
    });
