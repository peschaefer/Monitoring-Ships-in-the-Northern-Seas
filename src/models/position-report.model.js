const Ajv = require('ajv')
const ajv = new Ajv()

const PositionReportSchema = {

    type: "object",
    properties: {
        Timestamp: {type: "string"},
        Class: {type: "string"},
        MMSI: {type: "integer"},
        Position: {
            type: "object",
            properties: {
                coordinates: {type:"array"}
            },
            required: ["coordinates"],
            additionalProperties: true
        },
        Status: {type: "string"},
        RoT: {type: "number"},
        SoG: {type: "number"},
        CoG: {type: "number"},
        Heading: {type: "integer"}
    },
    required: ["Timestamp", "MMSI", "Position", "Status", "RoT", "SoG", "CoG", "Heading"],
    additionalProperties: true
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