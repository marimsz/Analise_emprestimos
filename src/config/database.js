 const mysql = require('mysql2');

 const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "analise_emprestimosdb"

 });

 connection.connect((err) => {
    if (err) {
        console.log('Erro o conectar ao banco!');
        console.log(err.message);
        return;
    }

    console.log('Banco de dados conectado!');
 });

 module.exports = connection;