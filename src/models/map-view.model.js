const Ajv = require('ajv')
const ajv = new Ajv()

const MapViewSchema = {
    type: "object",
    properties: {
        Id: {type: "integer"},
        Name: {type: "string"},
        LongitudeW: {type: "integer"},
        LongitudeS: {type: "integer"},
        LongitudeE: {type: "integer"},
        LongitudeN: {type: "integer"},
        Scale: {enum: ['1', '2', '3']},
        RasterFile: {type: "string"},
        ImageWidth: {type: "integer"},
        ImageHeight: {type: "integer"},
        ActualLongitudeW: {type: "integer"},
        ActualLongitudeS: {type: "integer"},
        ActualLongitudeE: {type: "integer"},
        ActualLongitudeN: {type: "integer"},
        ContainerMapView_Id: {type: "integer"},
    },
    required: ['Id', 'Name', 'LongitudeW', 'LongitudeS', 'LongitudeE', 'LongitudeN', 'Scale', 'RasterFile', 'ImageWidth', 'ImageHeight', 'ActualLongitudeW', 'ActualLongitudeS', 'ActualLongitudeE', 'ActualLongitudeN', 'ContainerMapView_Id'],
    additionalProperties: false
}
const validate = ajv.compile(MapViewSchema)

const MapViewValidator = (data) => {

    const valid = validate(data)

    return {
        valid: valid,
        message: ajv.errorsText(validate.errors)
    }
}

module.exports = {MapViewValidator}