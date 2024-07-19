import mysql from 'mysql2/promise'
import db from '../config/database.js';
export default class infoController{
    static async index(req,res){
        let connection;
        try{
             const { texto } = req.body;
            console.log(texto)
            connection=await mysql.createConnection(db)
            const [result]=await connection.execute('SELECT imagen_palabra FROM Palabras WHERE palabra = ?',[texto])
            console.log(result)
            res.json(result)
            res.json(texto)
        }
        catch(error){
            res.status(500).json({'error :':error.message})
        }
        finally{
            if(connection){
                await connection.end()
            }
        }
    }
}
