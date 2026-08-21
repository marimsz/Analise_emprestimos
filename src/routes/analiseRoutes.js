const express = require('express');
const analiseController = require('../controllers/analiseController');

const router = express.Router();

router.post('/customer-loans', analiseController.analisar);

module.exports = router;