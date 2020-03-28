const express = require('express')
const { celebrate, Segments, Joi } = require('celebrate')

const NgoController = require('./controller/NgoController')
const IncidentController = require('./controller/IncidentController')
const ProfileController = require('./controller/ProfileController')
const SessionController = require('./controller/SessionController')

const routes = express.Router()

routes.post('/sessions', celebrate({
  [Segments.BODY]: Joi.object().keys({
    ngoId: Joi.string().required()
  })
}),SessionController.create)

routes.get('/ngos', NgoController.index)

routes.post('/ngos', celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2)
  })
}), NgoController.create)

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown()
}), ProfileController.index)

routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number()
  })
}),IncidentController.index)

routes.post('/incidents', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),

  [Segments.BODY]: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required()
  }
}),IncidentController.create)

routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required()
  })
}),IncidentController.delete)

// Exportando a variável para disponibilizá-la:
module.exports = routes