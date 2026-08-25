// API de Análise de Empréstimos

API desenvolvida em Node.js, Express e MySQL para cadastro de clientes e análise de empréstimos disponíveis.

// Tecnologias utilizadas

- Node.js
- Express
- MySQL
- mysql2
- Thunder Client

// 1. Instalação das dependências

Para instalar as dependências do projeto, execute:

```bash
npm install

// Caso seja necessário instalar as dependências manualmente:

npm install express mysql2

// 2. Configuração do banco de dados

Primeiro, crie o banco de dados Mysql:

CREATE DATABASE analise_emprestimosdb;

Depois, selecione o banco:

USE analise_emprestimosdb;

Crie a tabela de clientes;

CREATE TABLE cliente (
    cpf varchar(11) primary key,
    idade int,
    nome varchar(100),
    renda_mensal decimal(10,2),
    estado_onde_reside varchar(50)
);

Crie a tabela modalidades de empréstimo:

CREATE TABLE modalidade_emprestimo (
    id_modalidade int primary key auto_increment,
    tipo varchar(50),
    modalidade varchar(50),
    taxa_juros decimal(5,2)
);

Crie a tabela de empréstimo:

CREATE TABLE emprestimo (
    id_emprestimo int primary key auto_increment,
    valor_solicitado decimal(10,2),
    prazo int,
    data_solicitacao date,
    status varchar(30),
    cpf varchar(11),
    id_modalidade int,

    foreign key (cpf) references cliente(cpf),
    foreign key (id_modalidade) references modalidade_emprestimo(id_modalidade)
);

Insira as modalidades disponíveis:

INSERT INTO modalidade_emprestimo
(tipo, modalidade, taxa_juros)
VALUES
('PERSONAL', 'Empréstimo Pessoal', 4.00),
('GUARANTEED', 'Empréstimo com Garantia', 3.00),
('CONSIGNMENT', 'Empréstimo Consignado', 2.00);

Configuração da conexão

A conexão com o banco de dados está configurada no arquivo:

src/config/database.js

// 3. Como executar o projeto

Após instalar as dependências e configurar o banco de dados, execute:

npm run dev

O servidor será iniciado na porta 3000.

A API estará disponível em:

http://localhost:3000

Quando o projeto estiver funcionando, o terminal deverá apresentar mensagens semelhantes a:

Servidor rodando na porta 3000
Banco de dados conectado!

// 4. Endpoints disponíveis
4.1 Cadastrar cliente

POST /customers

Cadastra um novo cliente.

Exemplo de requisição:

{
    "cpf": "12345678900",
    "nome": "João da Silva",
    "idade": 26,
    "renda_mensal": 7000,
    "estado_onde_reside": "SP"
}

Exemplo de URL:

POST http://localhost:3000/customers

4.2 Listar todos os clientes

GET /customers

Retorna todos os clientes cadastrados.

Exemplo:

GET http://localhost:3000/customers

4.3 Buscar cliente pelo CPF

GET /customers/:cpf

Busca um cliente utilizando o CPF.

Exemplo:

GET http://localhost:3000/customers/12345678900

4.4 Atualizar cliente

PUT /customers/:cpf

Atualiza os dados de um cliente.

Exemplo:

PUT http://localhost:3000/customers/12345678900

Body:

{
    "nome": "João Silva Atualizado",
    "idade": 27,
    "renda_mensal": 8000,
    "estado_onde_reside": "PE"
}
4.5 Remover cliente

DELETE /customers/:cpf

Remove um cliente pelo CPF.

Exemplo:

DELETE http://localhost:3000/customers/12345678900

4.6 Analisar empréstimos disponíveis

POST /customer-loans

Analisa os dados de um cliente e determina quais modalidades de empréstimo estão disponíveis de acordo com as regras de negócio.

Exemplo de URL:

POST http://localhost:3000/customer-loans

Exemplo de requisição:

{
    "idade": 26,
    "cpf": "27548438923",
    "nome": "João",
    "renda_mensal": 7000,
    "estado_onde_reside": "SP"
}

Exemplo de resposta:

{
    "customer": "João",
    "loans": [
        {
            "type": "CONSIGNMENT",
            "interest_rate": 2
        }
    ]
}

5. Regras de análise de empréstimos
Empréstimo Pessoal

Tipo:

PERSONAL

Taxa de juros:

4%

Disponível de acordo com as regras de renda, idade e localização definidas no sistema.

Empréstimo com Garantia

Tipo:

GUARANTEED

Taxa de juros:

3%

Disponível de acordo com as regras de renda, idade e localização definidas no sistema.

Empréstimo Consignado

Tipo:

CONSIGNMENT

Taxa de juros:

2%

Disponível para clientes com renda igual ou superior a R$ 5.000, de acordo com as regras implementadas.