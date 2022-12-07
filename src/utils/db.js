const mysql = require('mysql2/promise')
const config = require('../config/config')

async function query(sql, params) {
    const connection = await mysql.createConnection(config.db)
    try {
        const [results, ] = await connection.execute(sql, params)
        connection.end()
        return results
    } catch (err) {
        return err.sqlMessage
    }
}

module.exports = {
    query
}