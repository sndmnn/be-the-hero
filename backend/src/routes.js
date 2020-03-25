const express = require('express')
const NgoController = require('./controller/NgoController')
const IncidentController = require('./controller/IncidentController')
const ProfileController = require('./controller/ProfileController')
const SessionController = require('./controller/SessionController')

const routes = express.Router()

routes.post('/sessions', SessionController.create)

routes.get('/ngos', NgoController.index)
routes.post('/ngos', NgoController.create)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index)
routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', IncidentController.delete)

// Exportando a variável para disponibilizá-la:
module.exports = routes