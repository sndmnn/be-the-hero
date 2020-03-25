const knex = require('knex')
const config = require('../../knexfile')

// Utilizando a conexão de desenvolvimento:
const connection = knex(config.development)

module.exports = connection