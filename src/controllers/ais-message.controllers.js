const db = require('../utils/db')
// const UserModel = require('../models/example')

const getAISMessages = async (request, response) => {
    const data = await db.query('SELECT * FROM ais_message')
    response.status(200).json({data})
}

const store = async (request, response) => {

}

module.exports = {
    getAISMessages,
    store
}