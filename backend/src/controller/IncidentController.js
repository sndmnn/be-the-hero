const database = require('../database/connection')

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query

    const [count] = await database('incidents')
      .count()

    response.header('X-Total-Count', count['count(*)'])

    const incidents = await database('incidents')
      .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ngos.name',
        'ngos.email',
        'ngos.whatsapp',
        'ngos.city',
        'ngos.uf'
      ])
    
    return response.json(incidents)
  },

  async create(request, response) {
    const { title, description, value } = request.body
    // As informações do usuário logado vêm no "header" da requisição
    const ngoId = request.headers.authorization

    const [incidentId] = await database('incidents').insert({
      title,
      description,
      value,
      ngo_id: ngoId
    })

    return response.json({ incidentId })
  },

  async delete(request, response) {
    const { id } = request.params
    const ngoId = request.headers.authorization
    
    const incident = await database('incidents')
      .where('id', id)
      .select('ngo_id')
      .first()

    if(incident === undefined || incident.ngo_id !== ngoId) {
      return response.status(401).json({ 
        error: "Operation not permitted"
      })
    }

    await database('incidents')
      .where('id', id)
      .delete()

    return response.status(204).send()
  }
}