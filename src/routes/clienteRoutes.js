const express = require('express');

const clienteController = require('../controllers/clienteController');

const router = express.Router();

router.post('/customers', clienteController.cadastrar);

router.get('/customers', clienteController.listar);

router.get('/customers/:id_cliente', clienteController.buscarPorId);

router.put('/customers/:id_cliente', clienteController.atualizar);

router.delete('/customers/:id_cliente', clienteController.deletar);

module.exports = router;