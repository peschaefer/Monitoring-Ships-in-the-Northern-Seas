const db = require('../utils/db')
// const UserModel = require('../models/example')

const getVessels = async (request, response) => {
    const data = await db.query('SELECT * FROM vessel')
    response.status(200).json({data})
}

const store = async (request, response) => {

}

module.exports = {
    getVessels,
    store
}