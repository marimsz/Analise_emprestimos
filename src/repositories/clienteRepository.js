const connection = require('../config/database');


async function cadastrarCliente(cliente) {

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

    try {

        const [resultado] = await connection.query(sql, valores);

        return resultado;

    } catch (erro) {

        if (erro.code === 'ER_DUP_ENTRY') {
            const erroDuplicado = new Error('CPF já cadastrado');
            erroDuplicado.status = 409;
            throw erroDuplicado;
        }

        throw erro;
    }
}


    async function listarClientes() {

        const [resultado] = await connection.query(`
            SELECT
              cpf,
              idade,
              nome,
              renda_mensal,
              estado_onde_reside
            FROM cliente
           `);

         return resultado;
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

    function deletarCliente(id_cliente) {
        return new Promise((resolve, reject) => {

            const sql = `
            DELETE FROM cliente
            WHERE id_cliente = ?
            `;

               connection.query(sql, [id_cliente], (erro, resultado) => {

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
