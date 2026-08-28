const express = require('express');
const cors = require("cors")

const analiseRoutes = require('./routes/analiseRoutes');
const clienteRoutes = require('./routes/clienteRoutes');

const app = express();


app.use(cors(
   {
     origin: [
      'http://localhost:3000',
      'https://emprestimos-front.vercel.app',
     ],
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-type']
 }));

app.use(express.json());


app.use(analiseRoutes);
app.use(clienteRoutes);

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);

});