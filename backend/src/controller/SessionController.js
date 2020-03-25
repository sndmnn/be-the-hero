const connection = require('../database/connection')

module.exports = {
  async create(request, response) {
    const { ngoId } = request.body
  
    const ngo = await connection('ngos')
      .where('id', ngoId)
      .select('name')
      .first()

    if(!ngo) {
      return response.status(400).send({
        error: "No NGO found with this ID"
      })
    }

    return response.json(ngo)
  }
}