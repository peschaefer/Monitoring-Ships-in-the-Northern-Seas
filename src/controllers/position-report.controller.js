const db = require('../utils/db')

const getRecentShipPositions = async (request, response) => {
    const data = await db.query('SELECT * FROM POSITION_REPORT')
    response.status(200).json({data})
}

const getShipsMostRecentPosition = async (request, response) => {
    const MMSI = request.query.MMSI

    const AISResults = await db.query(`SELECT Id FROM AIS_MESSAGE WHERE MMSI = '${MMSI}'`)
    if(AISResults.length === 0) {
        response.status(200).json({data: []})
        return
    }
    const data = await db.query(`SELECT * FROM POSITION_REPORT WHERE AISMessage_Id = '${AISResults[AISResults.length - 1].Id}'`)
    response.status(200).json({data})
}

module.exports = {
    getRecentShipPositions,
    getShipsMostRecentPosition
}