const express = require('express')
const portControllers = require('../controllers/port.controllers')
const router = express.Router()


router.get('/', portControllers.getPort)

module.exports = router