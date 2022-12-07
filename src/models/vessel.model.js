const Ajv = require('ajv')
const ajv = new Ajv()

const VesselSchema = {
    type: "object",
    properties: {
        Id: {type: "integer"},
        LoCode: {type: "string"},
        Name: {type: "string"},
        Country: {type: "string"},
        Longitude: {type: "integer"},
        Latitude: {type: "integer"},
        Website: {type: "integer"},
        MapView1_Id: {type: "integer"},
        MapView2_Id: {type: "integer"},
        MapView3_Id: {type: "integer"},


    },
    required: ['Id', 'LoCode', 'Name', 'Country', 'Longitude', 'Latitude', 'Website', 'MapView1_Id', 'MapView2_Id', 'MapView3_Id'],
    additionalProperties: false
}
const validate = ajv.compile(VesselSchema)

const VesselValidator = (data) => {

    const valid = validate(data)

    return {
        valid: valid,
        message: ajv.errorsText(validate.errors)
    }


}

module.exports = {VesselValidator}