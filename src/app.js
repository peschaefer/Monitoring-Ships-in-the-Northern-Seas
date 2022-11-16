const express = require('express')
const exampleRouter = require('./routes/example.routes')

const app = express()

app.use('/', exampleRouter)

app.use(function (req, res) {
    res.status(404).json({
        message: "No route exists"
    })
})

app.listen(8081, () => {
    console.log("Server started")
})
module.exports = app