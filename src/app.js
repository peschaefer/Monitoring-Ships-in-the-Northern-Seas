const express = require('express')
const exampleRouter = require('./routes/example.routes')

const app = express()

app.use('/', exampleRouter)

app.use(function (req, res) {
    res.status(404).json({
        message: "No route exists"
    })
})

const listener = app.listen(8081, () => {
    console.log(`Server started on port: ${listener.address().port}`)
})
module.exports = app