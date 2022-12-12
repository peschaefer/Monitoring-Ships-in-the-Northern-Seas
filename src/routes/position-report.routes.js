const express = require('express')
const positionReportControllers = require('../controllers/position-report.controller')
const router = express.Router()


router.get('/', positionReportControllers.getRecentShipPositions)
router.get('/recent', positionReportControllers.getShipsMostRecentPosition)
router.get('/positions', positionReportControllers.getLastFiveShips)
module.exports = router