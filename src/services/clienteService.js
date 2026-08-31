const clienteRepository = require('../repositories/clienteRepository');

async function cadastrarCliente(cliente) {

    if (!cliente.cpf) {
        throw new Error('CPF é obrigatório');
    }

    if (!cliente.nome) {
        throw new Error('Nome é obrigatório');
    }

    if (cliente.idade === undefined || cliente.idade === null) {
        throw new Error('Idade é obrigatória');
    }

    if (cliente.renda_mensal === undefined || cliente.renda_mensal === null) {
        throw new Error('Renda mensal é obrigatória');
    }

    if (!cliente.estado_onde_reside) {
        throw new Error('Estado onde reside é obrigatório');
    }

    if (cliente.idade <= 0) {
        throw new Error('Idade inválida');
    }

    if (cliente.renda_mensal < 0) {
        throw new Error('Renda mensal inválida');
    }

    await clienteRepository.cadastrarCliente(cliente);

    return {
        mensagem: 'Cliente cadastrado com sucesso',
        cpf: cliente.cpf
    };
}


async function listarClientes() {

    const clientes = await clienteRepository.listarClientes();

    return clientes;
}


async function buscarPorId(id) {

    if (!id) {
        throw new Error('Não existe cliente');
    }

    const cliente = await clienteRepository.buscarPorId(id);

    if (!cliente) {
        throw new Error('Cliente não encontrado');
    }

    return cliente;
}


async function atualizarCliente(cpf, cliente) {

    if (!cpf) {
        throw new Error('CPF é obrigatório');
    }

    if (!cliente.nome) {
        throw new Error('Nome é obrigatório');
    }

    if (cliente.idade === undefined || cliente.idade === null) {
        throw new Error('Idade é obrigatória');
    }

    if (cliente.renda_mensal === undefined || cliente.renda_mensal === null) {
        throw new Error('Renda mensal é obrigatória');
    }

    if (!cliente.estado_onde_reside) {
        throw new Error('Estado onde reside é obrigatório');
    }

    if (cliente.idade <= 0) {
        throw new Error('Idade inválida');
    }

    if (cliente.renda_mensal < 0) {
        throw new Error('Renda mensal inválida');
    }

    const clienteExistente = await clienteRepository.buscarPorCpf(cpf);

    if (!clienteExistente) {
        throw new Error('Cliente não encontrado');
    }

    await clienteRepository.atualizarCliente(cpf, cliente);

    return {
        mensagem: 'Cliente atualizado com sucesso',
        cpf: cpf
    };
}

    async function deletarCliente(id_cliente) {

    if (!id_cliente) {
        throw new Error('ID do cliente é obrigatório');
    }

    const cliente = await clienteRepository.deletarCliente(id_cliente);

    if (!resultado.affectedRows === 0) {
        throw new Error('Cliente não encontrado');
    }

    return {
        mensagem: 'Cliente removido com sucesso',
        id_cliente: id_cliente
    };
}


module.exports = {
    cadastrarCliente,
    listarClientes,
    buscarPorId,
    atualizarCliente,
    deletarCliente
};