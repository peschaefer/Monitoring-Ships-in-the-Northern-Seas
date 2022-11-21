const db = require('../utils/db')
// const UserModel = require('../models/example')

const getPorts = async (request, response) => {
    const data = await db.query('SELECT * FROM port')
    response.status(200).json({data})
}

const store = async (request, response) => {

}

module.exports = {
    getPorts,
    store
}