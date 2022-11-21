const express = require('express')
const portControllers = require('../controllers/port.controllers')
// const bodyParser = require('body-parser')
const router = express.Router()

// const jsonParser = bodyParser.json()

router.get('/', portControllers.getPorts)

module.exports = router