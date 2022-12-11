const db = require('../utils/db')
// const UserModel = require('../models/example')


const getVessel = async (request, response) => {
    const MMSI = request.query.MMSI
    const data = await db.query(`SELECT * FROM vessel WHERE MMSI='${MMSI}'`)
    response.status(200).json({data})
}


module.exports = {
    getVessel,
}