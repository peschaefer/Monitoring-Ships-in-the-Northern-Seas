const request = require("supertest")
const app = require("../src/app")

describe("Test Getting A Vessel", () => {
    test("Should have vessel data", async () => {
        const response = await request(app).get("/vessel?MMSI=235095435")
        expect(response.body.data[0].IMO).toBe(1000019)
    })
})

//insert full valid AIS batch

//insert one invalid AIS Message in batch

//insert AIS Message, position report with no batch

//insert AIS Message, static data with no batch

//Test delete ais route

//get most recent position from mmsi

//test getting port by name

//test getting port by country?

//last 5 mmsi positions

//test get/insert queries with db.js

//sql injection?

//do we want a testing mode flag for functions to not query the database whatsoever?
