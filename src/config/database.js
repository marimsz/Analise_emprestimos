const mysql = require("mysql2");

require("dotenv").config();

const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ssl: {
        rejectUnauthorized: false
    }
});

connection.getConnection((erro, conexao) => {
    if (erro) {
        console.error("Erro ao conectar com o banco:", erro);
        return;
    }

    console.log("Banco de dados conectado com sucesso!");

    conexao.release();
});

module.exports = connection;