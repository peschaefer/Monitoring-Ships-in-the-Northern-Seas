const db = require('../utils/db')
const {AISMessageValidator} = require("../models/ais-message.model");
const {PositionReportValidator} = require("../models/position-report.model");
const {StaticDataValidator} = require("../models/static-data.model");

//counts minutes server has been up to do time calcs
let minsPassed = 5
setInterval(() => {
    minsPassed++
}, 60000)

const deleteOldAISMessages = async (request, response) => {
    //this date isnt the current time because the ais feed uses the date 2020-11-18 00:00:00 to send messages
    const result = await db.query(`DELETE FROM AIS_MESSAGE WHERE TIMESTAMPDIFF(MINUTE, AIS_MESSAGE.Timestamp, CONVERT('2020-11-18 00:${minsPassed}:00', DATETIME)) > 5`)
    response.status(200).json({deleted: result.affectedRows})
}

const store = async (request, response) => {
    const aisMessage = request.body

    let insertedRows = 0

    try {
        for (let i = 0; i < aisMessage.length; i++) {
            if (aisMessage[i].MsgType === "position_report") {
                const result = await storePositionReport(aisMessage[i], response)
                if (result.valid) {
                    insertedRows++
                }

            } else if (aisMessage[i].MsgType === "static_data") {
                const result = await storeStaticData(aisMessage[i], response)
                if (result.valid) {
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

const storePositionReport = async (aisMessage) => {
    const valid = PositionReportValidator(aisMessage)

    if (!valid.valid) {
        return valid
    }

    const result = await db.query(`INSERT INTO AIS_MESSAGE (MMSI, Class, Timestamp)
                                   VALUES ('${aisMessage.MMSI}', '${aisMessage.Class}', '${aisMessage.Timestamp.slice(0,-4)}')`)

    const AISResult = await db.query(`SELECT Id FROM AIS_MESSAGE WHERE MMSI='${aisMessage.MMSI}'`)


    const staticResult = await db.query(`SELECT AISMessage_Id FROM STATIC_DATA WHERE AISMessage_Id='${AISResult[AISResult.length - 1].Id}'`)
    if (staticResult.length === 0) {
        staticResult.push({AISMessage_Id: -1})
    }

    if (!aisMessage.RoT) {
        aisMessage.RoT = -1
    }
    if (!aisMessage.SoG) {
        aisMessage.SoG = -1
    }
    if (!aisMessage.CoG) {
        aisMessage.CoG = -1
    }
    if (!aisMessage.Heading) {
        aisMessage.Heading = -1
    }

    //uses last element of foundAISIds, id's auto increment so that means we can grab the highest one which will always be the last position of the array
    const positionResult = await db.query(`INSERT INTO POSITION_REPORT (AISMessage_Id, NavigationalStatus,
                                                                        Longitude, Latitude, RoT, SoG, CoG, Heading, LastStaticData_Id)
                                           VALUES ('${result.insertId}', '${aisMessage.Status}',
                                                   '${aisMessage.Position.coordinates[0]}',
                                                   '${aisMessage.Position.coordinates[1]}',
                                                   NULLIF('${aisMessage.RoT}', '-1'), NULLIF('${aisMessage.SoG}', '-1'),
                                                   NULLIF('${aisMessage.CoG}', '-1'), NULLIF('${aisMessage.Heading}', '-1'), NULLIF('${staticResult[staticResult.length - 1].AISMessage_Id}', '-1'))`)

    if (positionResult.affectedRows) {
        return {valid: valid}
    } else {
        return positionResult
    }

}
const storeStaticData = async (aisMessage) => {
    const valid = StaticDataValidator(aisMessage)

    if (!valid.valid) {
        console.log(valid)
        return valid
    }
    if (!aisMessage.IMO || typeof (aisMessage.IMO) === "string") {
        aisMessage.IMO = -1
    }

    const vesselResult = await db.query(`SELECT * FROM VESSEL WHERE IMO='${aisMessage.IMO}'`)
    if (vesselResult.length === 0) {
        aisMessage.IMO = -1
    }

    const result = await db.query(`INSERT INTO AIS_MESSAGE (MMSI, Class, Timestamp, Vessel_IMO)
                                   VALUES ('${aisMessage.MMSI}', '${aisMessage.Class}', '${aisMessage.Timestamp.slice(0,-4)}', NULLIF('${aisMessage.IMO}', -1))`)

    let portId = await db.query(`SELECT Id FROM PORT WHERE PORT.Name = '${aisMessage.Destination}'`)
    if (portId.length === 0) {
        portId = [{Id: -1}]
    }

    if (!aisMessage.CargoType) {
        aisMessage.CargoType = "No additional information"
    }

    let ETA = aisMessage.ETA
    if (ETA) {
        ETA = ETA.slice(0, -4)
    } else {
        ETA = -1
    }
    if (!aisMessage.CallSign) {
        aisMessage.CallSign = -1
    }
    const staticResult = await db.query(`INSERT INTO STATIC_DATA (AISMessage_Id, AISIMO, CallSign, Name, VesselType,
                                                                  CargoType, Length, Breadth, Draught,
                                                                  AISDestination, ETA, DestinationPort_Id)
                                         VALUES ('${result.insertId}', NULLIF('${aisMessage.IMO}', '-1'),
                                                 NULLIF('${aisMessage.CallSign}', '-1'),
                                                 '${aisMessage.Name}',
                                                 '${aisMessage.VesselType}', '${aisMessage.CargoType}',
                                                 '${aisMessage.Length}', '${aisMessage.Breadth}',
                                                 NULLIF('${aisMessage.Draught}', '${undefined}'), '${aisMessage.Destination}', NULLIF('${ETA}', '-1'), NULLIF('${portId[0].Id}', '-1') )`)

    if (staticResult.affectedRows) {
        return {valid: valid}
    } else {
        throw staticResult
    }
}

module.exports = {
    store,
    deleteOldAISMessages,
    storePositionReport,
    storeStaticData
}