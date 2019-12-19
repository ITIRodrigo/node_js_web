const mysql = require('mysql');
const { promisify } = require('util');
const { database } = require('./keys');
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') 
        {
            console.error('Conexión a la base de datos cerrada')    
        }
        if (err.code === 'ER_CON_COUNT_ERROR') 
        {
            console.error('Demasiadas conexiones a la base de datos')
        }
        if (err.code === 'ECONNREFUSED') 
        {
            console.error('Conexión a la base de datos rechazada')
        }
    }
    
    if (connection) connection.release();
    console.log('Conexión exitosa');
    return;
    
});

pool.query = promisify(pool.query);

module.exports = pool;