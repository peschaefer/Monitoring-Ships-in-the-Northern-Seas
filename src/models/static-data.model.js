const Ajv = require('ajv')
const ajv = new Ajv()

const StaticDataSchema = {
    type: "object",
    properties: {
        AISMessage_Id: {type: "integer"},
        AISIMO: {type: "integer"},
        CallSign: {type: "string"},
        Name: {type: "string"},
        VesselType: {type: "string"},
        CargoType: {type: "string"},
        Length: {type: "integer"},
        Breadth: {type: "integer"},
        Draught: {type: "integer"},
        AISDestination: {type: "string"},
        ETA: {type: "string"},
        DestinationPort_Id: {type: "integer"},
    },
    required: ["AISMessage_Id", "AISIMO", "CallSign", "Name", "VesselType", "CargoType", "Length", "Breadth", "Draught", "AISDestination", "ETA", "DestinationPort_Id"],
    additionalProperties: false
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