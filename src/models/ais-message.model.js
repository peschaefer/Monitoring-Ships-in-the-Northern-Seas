const Ajv = require('ajv')
const ajv = new Ajv()

const AISMessageSchema = {
    type: "object",
    properties: {
        Timestamp: {type: "string"},
        MMSI: {type: "integer"},
        Class: {enum: ["Class A", "Class B", "AtoN", "Base Station", "SAR Airborne", "Search and Rescue Transponder", "Man Overboard Device"]},
        Vessel_IMO: {type: "integer"}
    },
    required: ["Timestamp", "MMSI", "Class"],
    additionalProperties: true
}
const validate = ajv.compile(AISMessageSchema)

const AISMessageValidator = (data) => {

    const valid = validate(data)

    return {
        valid: valid,
        message: ajv.errorsText(validate.errors)
    }


}

module.exports = {AISMessageValidator}