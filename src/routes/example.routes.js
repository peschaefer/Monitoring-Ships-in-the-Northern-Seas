const express = require('express')
const exampleControllers = require('../controllers/example.controllers')
const bodyParser = require('body-parser')
const router = express.Router()

const jsonParser = bodyParser.json()

router.get('/example', exampleControllers.getExample)
router.post('/example', jsonParser, exampleControllers.store)

module.exports = router