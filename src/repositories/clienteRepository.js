const connection = require('../config/database');

function cadastrarCliente(cliente) {
    
    return new Promise((resolve, reject) => {

           const sql = `
            INSERT INTO cliente
            (cpf, idade, nome, renda_mensal, estado_onde_reside)
            VALUES (?, ?, ?, ?, ?)
        `;

        const valores = [
            cliente.cpf,
            cliente.idade,
            cliente.nome,
            cliente.renda_mensal,
            cliente.estado_onde_reside
        ];

        connection.query(sql, valores, (erro, resultado) => {

            if (erro) {
                reject(erro);
                return;
            }

            resolve(resultado);
        });
    });
}

    function listarClientes() {
        
        return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                cpf,
                idade,
                nome,
                renda_mensal,
                estado_onde_reside
            FROM cliente
        `;

        connection.query(sql, (erro, resultado) => {

            if (erro) {
                reject(erro);
                return;
            }

            resolve(resultado);
        });
    });
}

    function buscarPorCpf(cpf) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                cpf,
                idade,
                nome,
                renda_mensal,
                estado_onde_reside
            FROM cliente
            WHERE cpf = ?
        `;

        connection.query(sql, [cpf], (erro, resultado) => {

            if (erro) {
                reject(erro);
                return;
            }

            resolve(resultado[0]);
        });
    });
}

    function atualizarCliente(cpf, cliente) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE cliente
            SET idade = ?,
                nome = ?,
                renda_mensal = ?,
                estado_onde_reside = ?
            WHERE cpf = ?
        `;

        const valores = [
            cliente.idade,
            cliente.nome,
            cliente.renda_mensal,
            cliente.estado_onde_reside,
            cpf
        ];

        connection.query(sql, valores, (erro, resultado) => {

            if (erro) {
                reject(erro);
                return;
            }

            resolve(resultado);
        });
    });
}

    function deletarCliente(cpf) {
        
        return new Promise((resolve, reject) => {

            const sql = `
            DELETE FROM cliente
            WHERE cpf = ?
            `;

               connection.query(sql, [cpf], (erro, resultado) => {

            if (erro) {
                reject(erro);
                return;
            }

            resolve(resultado);
        });
      });
    }
    

module.exports = {
    cadastrarCliente,
    listarClientes,
    buscarPorCpf,
    atualizarCliente,
    deletarCliente
};
