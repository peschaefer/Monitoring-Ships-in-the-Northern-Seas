const db = require('../utils/db')
const UserModel = require("../models/example");
const {AISMessageValidator} = require("../models/ais-message.model");
const {PositionReportValidator} = require("../models/position-report.model");
const {StaticDataValidator} = require("../models/static-data.model");
const {getPort} = require("./port.controllers");
const {NULL} = require("mysql/lib/protocol/constants/types");
// const UserModel = require('../models/example')
const getAISMessages = async (request, response) => {
    const data = await db.query('SELECT * FROM ais_message')
    response.status(200).json({data})
}

const deleteOldAISMessages = async (request, response) => {
    //this date isnt the current time because the ais feed uses the date 2020-11-18 00:00:00 to send messages
    const result = await db.query(`SELECT AIS_MESSAGE.Id FROM AIS_MESSAGE WHERE TIMESTAMPDIFF(MINUTE, AIS_MESSAGE.Timestamp, CONVERT('2020-11-18 00:06:00', DATETIME)) > 5`)

    for(let i = 0; i < result.length; i++) {
        const aisId = result[i].Id
        await db.query(`DELETE FROM POSITION_REPORT WHERE AISMessage_Id = ${aisId}`)

        await db.query(`DELETE FROM AIS_MESSAGE WHERE Id = ${aisId}`)
    }
    response.status(200).json({deleted: result.length})
}

const store = async (request, response) => {
    const aisMessage = request.body
    // const valid = AISMessageValidator(request.body)
    //
    // if(!valid.valid) {
    //     response.status(400).json({status: valid})
    //     return
    // }
    let insertedRows = 0
    //this only works if wrapped in array
    try {
        for(let i = 0; i < aisMessage.length; i++) {
            if (aisMessage[i].MsgType === "position_report") {
                const result = await storePositionReport(aisMessage[i], response)
                if(result.valid) {
                    insertedRows++
                }

            } else if (aisMessage[i].MsgType === "static_data") {
                const result = await storeStaticData(aisMessage[i], response)
                if(result.valid) {
                    insertedRows++
                }
            }
        }
    } catch (e) {
        console.log(e)
    } finally {
        response.status(201).json({insertedRows: insertedRows, sentRows: aisMessage.length})
    }


}

const storePositionReport = async (aisMessage, response) => {
    // console.log("Position: ")
    // console.log(aisMessage)

    const valid = PositionReportValidator(aisMessage)

    if(!valid.valid) {
        return valid
    }

    const result = await db.query(`INSERT INTO AIS_MESSAGE (MMSI, Class, Timestamp)
                                   VALUES ('${aisMessage.MMSI}', '${aisMessage.Class}', '${aisMessage.Timestamp.slice(0,-4)}')`)

    const positionResult = await db.query(`INSERT INTO POSITION_REPORT (AISMessage_Id, NavigationalStatus,
                                                                        Longitude, Latitude, RoT, SoG, CoG, Heading)
                                           VALUES ('${result.insertId}', '${aisMessage.Status}',
                                                   '${aisMessage.Position.coordinates[0]}',
                                                   '${aisMessage.Position.coordinates[1]}',
                                                   '${aisMessage.RoT}', '${aisMessage.SoG}',
                                                   '${aisMessage.CoG}', '${aisMessage.Heading}')`)

    if (positionResult.affectedRows) {
        return {valid: valid}
    } else {
        return positionResult

        // response.status(400).json({valid: false, message: result})
    }

}
const storeStaticData = async (aisMessage, response) => {
    // console.log("Static: ")
    // console.log(aisMessage)

    const valid = StaticDataValidator(aisMessage)

    if(!valid.valid) {
        console.log(valid)
        return valid
    }
    const result = await db.query(`INSERT INTO AIS_MESSAGE (MMSI, Class, Timestamp)
                                   VALUES ('${aisMessage.MMSI}', '${aisMessage.Class}', '${aisMessage.Timestamp.slice(0,-4)}')`)
    //right now fails if they dont have one
    // if(aisMessage.IMO === "Unknown") {
    //     aisMessage.IMO = -12345678
    // }
    let portId = await db.query(`SELECT Id FROM PORT WHERE PORT.Name = '${aisMessage.Destination}'`)
    if(portId.length === 0) {
        portId = [{Id: -1}]
    }

    if(!aisMessage.CargoType) {
        aisMessage.CargoType = "No additional information"
    }

    let ETA = aisMessage.ETA
    if(ETA) {
        ETA = ETA.slice(0, -4)
    } else {
        ETA = -1
    }
    const staticResult = await db.query(`INSERT INTO STATIC_DATA (AISMessage_Id, AISIMO, CallSign, Name, VesselType,
                                                                  CargoType, Length, Breadth, Draught,
                                                                  AISDestination, ETA, DestinationPort_Id)
                                         VALUES ('${result.insertId}', '${aisMessage.IMO}',
                                                 '${aisMessage.CallSign}',
                                                 '${aisMessage.Name}',
                                                 '${aisMessage.VesselType}', '${aisMessage.CargoType}',
                                                 '${aisMessage.Length}', '${aisMessage.Breadth}',
                                                 '${aisMessage.Draught}', '${aisMessage.Destination}', NULLIF('${ETA}', '-1'), NULLIF('${portId[0].Id}', -1) )`)

    if (staticResult.affectedRows) {
        return {valid: valid}
    } else {
        throw staticResult
        // response.status(400).json({valid: false, message: staticResult})
    }
}

module.exports = {
    getAISMessages,
    store,
    deleteOldAISMessages
}