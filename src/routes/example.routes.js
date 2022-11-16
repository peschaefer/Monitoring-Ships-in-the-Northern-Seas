const express = require('express')
const exampleControllers = require('../controllers/example.controllers')
const router = express.Router()

router.get('/example', exampleControllers.getExample)

module.exports = router