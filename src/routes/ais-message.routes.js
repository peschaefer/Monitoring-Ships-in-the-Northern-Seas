const express = require('express')
const AISController = require('../controllers/ais-message.controllers')
const bodyParser = require('body-parser')
const router = express.Router()

const jsonParser = bodyParser.json()

router.get('/', AISController.getAISMessages)
router.post('/', jsonParser, AISController.store)
router.get('/delete', AISController.deleteOldAISMessages)


module.exports = router