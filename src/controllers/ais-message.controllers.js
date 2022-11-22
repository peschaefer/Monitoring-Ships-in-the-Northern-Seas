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
    //figure out timestamp datetime format to insert, no value sent right now
    if (aisMessage.MsgType === "position_report") {
        await storePositionReport(aisMessage)

    } else if (aisMessage.MsgType === "static_data") {
        await storeStaticData(aisMessage)
    }

}
//move to own controller?
const storePositionReport = async (aisMessage) => {
    const result = await db.query(`INSERT INTO AIS_MESSAGE (MMSI, Class)
                                   VALUES ('${aisMessage.MMSI}', '${aisMessage.Class}')`)

    const positionResult = await db.query(`INSERT INTO POSITION_REPORT (AISMessage_Id, NavigationalStatus,
                                                                        Longitude, Latitude, RoT, SoG, CoG, Heading)
                                           VALUES ('${result.insertId}', '${aisMessage.Status}',
                                                   '${aisMessage.Position.coordinates[0]}',
                                                   '${aisMessage.Position.coordinates[1]}',
                                                   '${aisMessage.RoT}', '${aisMessage.SoG}',
                                                   '${aisMessage.CoG}', '${aisMessage.Heading}')`)

    if (positionResult.affectedRows) {
        response.status(201).json({valid: true, data: request.body})
    } else {
        response.status(400).json({valid: false, message: positionResult})
    }
}
//move to own controller?
const storeStaticData = async (aisMessage) => {
    const result = await db.query(`INSERT INTO AIS_MESSAGE (MMSI, Class)
                                   VALUES ('${aisMessage.MMSI}', '${aisMessage.Class}')`)
    //eta and port id, cross query later
    const staticResult = await db.query(`INSERT INTO STATIC_DATA (AISMessage_Id, AISIMO, CallSign, Name, VesselType,
                                                                  CargoType, Length, Breadth, Draught,
                                                                  AISDestination)
                                         VALUES ('${result.insertId}', '${aisMessage.IMO}',
                                                 '${aisMessage.CallSign}',
                                                 '${aisMessage.Name}',
                                                 '${aisMessage.VesselType}', '${aisMessage.CargoType}',
                                                 '${aisMessage.Length}', '${aisMessage.Breadth}',
                                                 '${aisMessage.Draught}', '${aisMessage.Destination}')`)

    if (staticResult.affectedRows) {
        response.status(201).json({valid: true, data: request.body})
    } else {
        response.status(400).json({valid: false, message: staticResult})
    }
}

module.exports = {
    getAISMessages,
    store
}