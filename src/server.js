
const app = require("./app")

const listener = app.listen(8081, () => {
    console.log(`Server started on port: ${listener.address().port}`)
})