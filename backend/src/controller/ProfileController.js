const database = require('../database/connection')

module.exports = {
  async index(request, response) {
    const ngoId = request.headers.authorization

    const incidents = await database('incidents')
      .where('ngo_id', ngoId)
      .select('*')

    return response.json(incidents)
  }
}