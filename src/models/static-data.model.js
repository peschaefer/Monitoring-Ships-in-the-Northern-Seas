const Ajv = require('ajv')
const ajv = new Ajv()

const StaticDataSchema = {
    type: "object",
    properties: {
        Timestamp: {type: "string"},
        Class: {type: "string"},
        MMSI: {type: "integer"},
        IMO: {type: ["integer", "string"]},
        Name: {type: "string"},
        VesselType: {type: "string"},
        Length: {type: "number"},
        Breadth: {type: "number"},
        CargoType: {type: "string", default: "No additional information"}
    },
    required: ["Timestamp", "Class", "MMSI", "IMO", "Name", "VesselType", "Length", "Breadth"],
    additionalProperties: true
}
const validate = ajv.compile(StaticDataSchema)

const StaticDataValidator = (data) => {

    const valid = validate(data)

    return {
        valid: valid,
        message: ajv.errorsText(validate.errors)
    }


}

module.exports = {StaticDataValidator}