const request = require('supertest')
const app = require('../../src/app')
const database = require('../../src/database/connection')

describe('NGO', () => {
  beforeEach(async () => {
    await database.migrate.rollback()
    await database.migrate.latest()
  })

  afterAll(async () => {
    await database.destroy()
  })

  it('should be able to create a new NGO', async () => {
    const response = await request(app)
      .post('/ngos')
      .send({
        name: "ONG testes",
        email: "contato@ong.com.br",
        whatsapp: "4700000000",
        city: "Belo Horizonte",
        uf: "MG"
      })

    expect(response.body).toHaveProperty('id')
    expect(response.body.id).toHaveLength(8)
  })
})