const clienteService = require('../services/clienteService');


async function cadastrar(req, res) {

    try {

        const cliente = req.body;

        const resultado = await clienteService.cadastrarCliente(cliente);

        res.status(201).json(resultado);

    } catch (erro) {

        console.log('ERRO AO CADASTRAR:', erro);

        if (erro.status === 409) {
            return res.status(409).json({
                erro: erro.message
            });
        }

        return res.status(400).json({
            erro: erro.message
        });
    }
}



     async function listar(req, res) {

    try {

        const clientes = await clienteService.listarClientes();

        res.status(200).json(clientes);

    } catch (erro) {

        console.log('ERRO:', erro);

        res.status(500).json({
            erro:'Erro ao listar clientes',
            mensagem: erro.message
        });
    }
}

    async function buscarPorCpf(req, res) {

    try {

        const cpf = req.params.cpf;

        const cliente = await clienteService.buscarPorCpf(cpf);

        res.status(200).json(cliente);

    } catch (erro) {

        console.log('ERRO:', erro);

        res.status(404).json({
            erro: erro.message
        });
    }
}

    async function atualizar(req, res) {

    try {

        const cpf = req.params.cpf;
        const cliente = req.body;

        const resultado = await clienteService.atualizarCliente(
            cpf,
            cliente
        );

        res.status(200).json(resultado);

    } catch (erro) {

        console.log('ERRO:', erro);

        res.status(400).json({
            erro: erro.message
        });
    }
}
 
    async function deletar(req, res) {

    try {

        const id_cliente = req.params.id_cliente;

        const resultado = await clienteService.deletarCliente(id_cliente);

        res.status(200).json(resultado);

    } catch (erro) {

        console.log('ERRO:', erro);

        res.status(404).json({
            erro: erro.message
        });
    }
}

module.exports = {
    cadastrar,
    listar,
    buscarPorCpf,
    atualizar,
    deletar
};