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
              id_cliente,
              cpf,
              idade,
              nome,
              renda_mensal,
              estado_onde_reside
            FROM cliente
           `);

         return resultado;
}

    
async function buscarPorId(id) {

    const sql = `
        SELECT 
            id_cliente,
            cpf,
            idade,
            nome,
            renda_mensal,
            estado_onde_reside
        FROM cliente
        WHERE id_cliente = ?
    `;

    const [resultado] = await connection.query(sql, [id]);

    return resultado[0];
}

    async function atualizarCliente(id_cliente, cliente) {

    const sql = `
        UPDATE cliente
        SET idade = ?,
            nome = ?,
            renda_mensal = ?,
            estado_onde_reside = ?
        WHERE id_cliente = ?
    `;

    const valores = [
        cliente.idade,
        cliente.nome,
        cliente.renda_mensal,
        cliente.estado_onde_reside,
        id_cliente
    ];

    const [resultado] = await connection.query(sql, valores);

    return resultado;
}

    async function deletarCliente(id_cliente) {

    const sql = `
        DELETE FROM cliente
        WHERE id_cliente = ?
    `;

    const [resultado] = await connection.query(sql, [id_cliente]);

    return resultado;
}
    

module.exports = {
    cadastrarCliente,
    listarClientes,
    buscarPorId,
    atualizarCliente,
    deletarCliente
};
