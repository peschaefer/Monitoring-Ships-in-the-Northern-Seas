const db = require('../utils/db')

const getRecentShipPositions = async (request, response) => {
    const data = await db.query('SELECT * FROM POSITION_REPORT')
    response.status(200).json({data})
}

module.exports = {
    getRecentShipPositions,
}