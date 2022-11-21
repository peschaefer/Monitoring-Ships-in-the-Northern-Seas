const express = require('express')
const exampleRouter = require('./routes/example.routes')
const vesselRouter = require('./routes/vessel.routes')
const portRouter = require('./routes/port.routes')
const aisRouter = require('./routes/ais-message.routes')

const app = express()

app.use('/', exampleRouter)
app.use('/vessel', vesselRouter)
app.use('/port', portRouter)
app.use('/ais-message', aisRouter)

app.use(function (req, res) {
    res.status(404).json({
        message: "No route exists"
    })
})

const listener = app.listen(8081, () => {
    console.log(`Server started on port: ${listener.address().port}`)
})
module.exports = app