const express = require('express')
const vesselControllers = require('../controllers/vessel.controllers')
// const bodyParser = require('body-parser')
const router = express.Router()

// const jsonParser = bodyParser.json()

router.get('/', vesselControllers.getVessels)

module.exports = router