const express = require('express')
const vesselRouter = require('./routes/vessel.routes')
const portRouter = require('./routes/port.routes')
const aisRouter = require('./routes/ais-message.routes')
const positionReportRouter = require('./routes/position-report.routes')

const app = express()

app.use('/vessel', vesselRouter)
app.use('/port', portRouter)
app.use('/ais-message', aisRouter)
app.use('/position-reports', positionReportRouter)

app.use(function (req, res) {
    res.status(404).json({
        message: "No route exists"
    })
})


module.exports = app