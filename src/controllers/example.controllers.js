const db = require('../utils/db')
const UserModel = require('../models/example')
const getExample = async (request, response) => {
    const data = await db.query('SELECT * FROM port')
    response.status(200).json({data})
}

const store = async (request, response) => {
    //improve this block
    const user = request.body
    const valid = UserModel.UserValidator(request.body)

    if(!valid.valid) {
        response.status(400).json({status: valid})
        return
    }

    const result = await db.query(`INSERT INTO users (name) VALUES ('${user.name}')`)

    if(result.affectedRows) {
        response.status(201).json({valid: true, data: request.body})
    }
    else {
        response.status(400).json({valid: false, message: result})
    }
}

module.exports = {
    getExample,
    store
}