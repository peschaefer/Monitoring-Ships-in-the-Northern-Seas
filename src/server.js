
const app = require("./app")

const listener = app.listen(8082, () => {
    console.log(`Server started on port: ${listener.address().port}`)
})