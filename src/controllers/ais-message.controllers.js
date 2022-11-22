const db = require('../utils/db')
const UserModel = require("../models/example");
const {AISMessageValidator} = require("../models/ais-message.model");
// const UserModel = require('../models/example')

const getAISMessages = async (request, response) => {
    const data = await db.query('SELECT * FROM ais_message')
    response.status(200).json({data})
}

const store = async (request, response) => {
    const aisMessage = request.body
    // const valid = AISMessageValidator(request.body)
    //
    // if(!valid.valid) {
    //     response.status(400).json({status: valid})
    //     return
    // }
    console.log(aisMessage.Position.coordinates[0])

    if (aisMessage.MsgType === "position_report") {
        const result = await db.query(`INSERT INTO AIS_MESSAGE (MMSI, Class)
                                       VALUES ('${aisMessage.MMSI}', '${aisMessage.Class}')`)

        const positionResult = await db.query(`INSERT INTO POSITION_REPORT (AISMessage_Id, NavigationalStatus,
                                                                            Longitude, Latitude, RoT, SoG, CoG, Heading)
                                               VALUES ('${result.insertId}', '${aisMessage.Status}',
                                                       '${aisMessage.Position.coordinates[0]}',
                                                       '${aisMessage.Position.coordinates[1]}',
                                                       '${aisMessage.RoT}', '${aisMessage.SoG}',
                                                       '${aisMessage.CoG}', '${aisMessage.Heading}')`)

        if(positionResult.affectedRows) {
            response.status(201).json({valid: true, data: request.body})
        }
        else {
            response.status(400).json({valid: false, message: positionResult})
        }
    } else if (aisMessage.MsgType === "static_data") {

    }



}

module.exports = {
    getAISMessages,
    store
}