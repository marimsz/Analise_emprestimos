const express = require('express');

const analiseRoutes = require('./routes/analiseRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();

app.use(express.json());

app.use(analiseRoutes);
app.use(clienteRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});