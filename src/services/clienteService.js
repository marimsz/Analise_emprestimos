const clienteRepository = require('../repositories/clienteRepository');

function validarCliente() {
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
}


//Cadastrar Cliente
async function cadastrarCliente(cliente) {
    validarCliente(cliente);

    await clienteRepository.cadastrarCliente(cliente);

    return {
        mensagem: 'Cliente cadastrado com sucesso',
        cpf: cliente.cpf
    };
}

//Listar Cliente
async function listarClientes() {

    const clientes = await clienteRepository.listarClientes();

    return clientes;
}

//Buscar Por ID
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

//Atualizar Cliente
async function atualizarCliente(id_cliente, cliente) {
if (!id_cliente) {
        throw new Error('ID do cliente é obrigatório');
    }

    validarCliente(cliente);

    const clienteExistente =
        await clienteRepository.buscarPorId(id_cliente);

    if (!clienteExistente) {
        throw new Error('Cliente não encontrado');
    }

    await clienteRepository.atualizarCliente(
        id_cliente,
        cliente
    );

    return {
        mensagem: 'Cliente atualizado com sucesso',
        id_cliente: id_cliente
    };
}


//Deletar Cliente
    async function deletarCliente(id_cliente) {

    if (!id_cliente) {
        throw new Error('ID do cliente é obrigatório');
    }

    const resultado = await clienteRepository.deletarCliente(id_cliente);

    if (resultado.affectedRows === 0) {
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