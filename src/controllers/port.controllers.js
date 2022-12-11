const db = require('../utils/db')

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



module.exports = {
    getPort,
}