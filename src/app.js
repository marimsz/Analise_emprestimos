const express = require('express');
const cors = require("cors")

const analiseRoutes = require('./routes/analiseRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();


app.use(express.json());
app.use(cors());

app.use(analiseRoutes);
app.use(clienteRoutes);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});