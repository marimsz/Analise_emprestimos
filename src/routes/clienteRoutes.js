const express = require('express');

const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.post('/customers', clienteController.cadastrar);

router.get('/customers', clienteController.listar);

router.get('/customers/:cpf', clienteController.buscarPorCpf);

router.put('/customers/:cpf', clienteController.atualizar);

router.delete('/customers/:id_cliente', clienteController.deletar);

module.exports = router;