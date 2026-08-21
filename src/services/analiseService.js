const connection = require('../config/database');

async function analisarCliente(cliente) {
    const tiposDisponiveis = [];

    const renda = Number(cliente.renda_mensal);
    const idade = Number(cliente.idade);
    const estado = cliente.estado_onde_reside.toUpperCase();

    // Empréstimo Pessoal
    if (
        renda <= 3000 ||
        (renda > 3000 && renda <= 5000 && idade < 30 && estado === 'SP')
    ) {
        tiposDisponiveis.push('PERSONAL');
    }

    // Empréstimo com Garantia
    if (
        renda <= 3000 ||
        (renda > 3000 && renda <= 5000 && idade < 30 && estado === 'SP')
    ) {
        tiposDisponiveis.push('GUARANTEED');
    }

    // Empréstimo Consignado
    if (renda >= 5000) {
        tiposDisponiveis.push('CONSIGNMENT');
    }

    if (tiposDisponiveis.length === 0) {
        return [];
    }

    const placeholders = tiposDisponiveis.map(() => '?').join(', ');

    const sql = `
        SELECT tipo, modalidade, taxa_juros
        FROM modalidade_emprestimo
        WHERE tipo IN (${placeholders})
    `;

    const [resultado] = await connection.promise().query(
        sql,
        tiposDisponiveis
    );

    return resultado.map(modalidade => ({
        type: modalidade.tipo,
        interest_rate: Number(modalidade.taxa_juros)
    }));
}

module.exports = {
    analisarCliente
};
