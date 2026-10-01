const connection = require('./src/config/database');

async function criarBanco() {
    try {

        await connection.query(`
            CREATE TABLE IF NOT EXISTS cliente (
                id_cliente INT AUTO_INCREMENT PRIMARY KEY,
                cpf VARCHAR(14) NOT NULL UNIQUE,
                idade INT NOT NULL,
                nome VARCHAR(100) NOT NULL,
                renda_mensal DECIMAL(10,2) NOT NULL,
                estado_onde_reside VARCHAR(2) NOT NULL
            )
        `);

        console.log('Tabela cliente criada com sucesso!');

        await connection.query(`
            CREATE TABLE IF NOT EXISTS modalidade_emprestimo (
                id INT AUTO_INCREMENT PRIMARY KEY,
                tipo VARCHAR(30) NOT NULL UNIQUE,
                modalidade VARCHAR(100) NOT NULL,
                taxa_juros DECIMAL(5,2) NOT NULL
            )
        `);

        console.log('Tabela modalidade_emprestimo criada com sucesso!');

        await connection.query(`
            INSERT IGNORE INTO modalidade_emprestimo
            (tipo, modalidade, taxa_juros)
            VALUES
            ('PERSONAL', 'Empréstimo Pessoal', 4.00),
            ('GUARANTEED', 'Empréstimo com Garantia', 3.00),
            ('CONSIGNMENT', 'Empréstimo Consignado', 2.00)
        `);

        console.log('Modalidades cadastradas com sucesso!');

        process.exit(0);

    } catch (erro) {
        console.error('Erro ao criar banco:', erro);
        process.exit(1);
    }
}

criarBanco();