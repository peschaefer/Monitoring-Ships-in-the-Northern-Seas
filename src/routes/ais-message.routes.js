const express = require('express')
const portControllers = require('../controllers/ais-message.controllers')
// const bodyParser = require('body-parser')
const router = express.Router()

// const jsonParser = bodyParser.json()

router.get('/', portControllers.getAISMessages)

module.exports = router