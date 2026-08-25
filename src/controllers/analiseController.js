const analiseService = require('../services/analiseService');

async function analise(req, res) {
    try {
        const cliente = req.body;

        const modalidades = await analiseService.analisarCliente(cliente);

        res.status(200).json({
            customer: cliente.nome,
            loans: modalidades
        });

    } catch (error) {
        console.log('ERRO', error);

        res.status(500).json({
            erro: 'Erro ao analisar o cliente',
            mensagem: error.message
        });
    }
}

module.exports = {
    analise
}