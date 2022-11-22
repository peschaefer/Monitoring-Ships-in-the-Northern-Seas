const Ajv = require('ajv')
const ajv = new Ajv()

const PositionReportSchema = {
    type: "object",
    properties: {
        AISMessage_Id: {type: "integer"},
        NavigationalStatus: {type: "string"},
        Longitude: {type: "integer"},
        Latitude: {type: "integer"},
        RoT: {type: "integer"},
        SoG: {type: "integer"},
        CoG: {type: "integer"},
        Heading: {type: "integer"},
        LastStaticData_Id: {type: "integer"},
        MapView1_Id: {type: "integer"},
        MapView2_Id: {type: "integer"},
        MapView3_Id: {type: "integer"},
    },
    required: ["AIS_Message_Id", "NavigationalStatus", "Longitude", "Latitude", "RoT", "SoG", "CoG", "Heading"],
    additionalProperties: false
}
const validate = ajv.compile(PositionReportSchema)

const PositionReportValidator = (data) => {

    const valid = validate(data)

    return {
        valid: valid,
        message: ajv.errorsText(validate.errors)
    }


}

module.exports = {PositionReportValidator}