const Ajv = require('ajv')
const ajv = new Ajv()

const UserSchema = {
    type: "object",
    properties: {
        name: {type: "string"}
    },
    required: ["name"],
    additionalProperties: false
}
const validate = ajv.compile(UserSchema)

const UserValidator = (data) => {

    const valid = validate(data)

    return {
        valid: valid,
        message: ajv.errorsText(validate.errors)
    }


}

module.exports = {UserValidator}