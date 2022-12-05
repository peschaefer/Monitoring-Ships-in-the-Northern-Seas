const db = require('../utils/db')

const getPorts = async (request, response) => {
    const data = await db.query('SELECT * FROM port')
    response.status(200).json({data})
}

const getPort = async (request, response) => {
    //http://localhost:8081/port?port=${port_name}
    const port = request.query.port
    const country = request.query.country
    let data
    if(country) {
        data = await db.query(`SELECT *
                                     FROM port
                                     WHERE Name = '${port}'
                                       AND Country = '${country}'`)
    } else{
        data = await db.query(`SELECT *
                                     FROM port
                                     WHERE Name = '${port}'`)
    }
    response.status(200).json({data})
}

const store = async (request, response) => {

}

module.exports = {
    getPorts,
    getPort,
    store
}