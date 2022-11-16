// const Example = require('../models/example')
const db = require('../utils/db')

const getExample = async (request, response) => {
    const data = await db.query('SELECT * FROM users')
    response.status(200).json({data})
}

const store = async (request, response) => {
    const user = request.body

    const result = await db.query(`INSERT INTO users (name) VALUES ('${user.name}')`)

    if(result.affectedRows) {
        response.status(201).json("Success")
    }
    else {
        response.status(400).json("NO")
    }
}

module.exports = {
    getExample,
    store
}