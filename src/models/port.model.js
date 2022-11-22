const Ajv = require('ajv')
const ajv = new Ajv()

const PortSchema = {
    type: "object",
    properties: {
        IMO: {type: "integer"},
        Flag: {type: "string"},
        Name: {type: "string"},
        Built: {type: "integer"},
        CallSign: {type: "string"},
        Length: {type: "integer"},
        Breadth: {type: "integer"},
        Tonnage: {type: "integer"},
        MMSI: {type: "integer"},
        Type: {type: "string"},
        Status: {type: "string"},
        Owner: {type: "string"},
    },
    required: ['IMO', 'Flag', 'Name', 'Built', 'CallSign', 'Length', 'Breadth', 'Tonnage', 'MMSI', 'Type', 'Status', 'Owner'],
    additionalProperties: false
}
const validate = ajv.compile(PortSchema)

const PortValidator = (data) => {

    const valid = validate(data)

    return {
        valid: valid,
        message: ajv.errorsText(validate.errors)
    }


}

module.exports = {PortValidator}