// const Example = require('../models/example')

const getExample = async (req, res) => {
    res.status(200).json({message: "Example Json Message"})
}

module.exports = {
    getExample
}