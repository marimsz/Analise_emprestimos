const mysql = require("mysql2/promise");

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

async function testarConexao() {
    try {
        const conexao = await connection.getConnection();

        console.log("Banco de dados conectado com sucesso!");

        conexao.release();
    } catch (erro) {
        console.error("Erro ao conectar com o banco:", erro);
    }
}

testarConexao();

module.exports = connection;