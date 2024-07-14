import mysql from 'mysql2/promise';
import db from '../config/database.js';

export default class InfoController {
  static async index(req, res) {
    const { texto } = req.query; // Obtén el texto de los parámetros de consulta
    console.log(`Texto recibido en la consulta: ${texto}`); // Imprime el texto en la consola del servidor

    let connection;
    try {
      connection = await mysql.createConnection(db);
      const [result] = await connection.execute('SELECT imagen_palabra FROM Palabras WHERE palabra = ?', [texto]);
      console.log(result); // Imprime el resultado de la consulta en la consola del servidor
      res.json({ data: result });
    } catch (error) {
      res.status(500).json({ error: error.message });
    } finally {
      if (connection) {
        await connection.end();
      }
    }
  }
}
