const request = require("supertest")
const app = require("../src/app")
const validAISBatchJson = require("./validAisBatch.json")
const invalidAISBatchJson = require("./invalidAisBatch.json")

describe("Test Getting A Vessel", () => {
    test("Should have vessel data", async () => {
        const response = await request(app).get("/vessel?MMSI=235095435")
        expect(response.body.data[0].IMO).toBe(1000019)
    })
})

//insert full valid AIS batch
describe("Test Posting a valid AIS batch", () => {
    test("Should have 3 inserted rows", async () => {
        const response = await request(app).post('/ais-message').send(validAISBatchJson)
        expect(response.body.insertedRows).toBe(3)
    })
})
//insert one invalid AIS Message in batch
describe("Test Posting invalid AIS batch", () => {
    test("Should have 2 inserted rows", async () => {
        const response = await request(app).post('/ais-message').send(invalidAISBatchJson)
        expect(response.body.insertedRows).toBe(2)
    })
})
//insert AIS Message, position report with no batch

//insert AIS Message, static data with no batch

//Test delete ais route

//get most recent position from mmsi
describe("Test Getting most recent position from mmsi", () => {
    test("Should get the test position report", async () => {
        const response = await request(app).get('/position-reports/recent?MMSI=0')
        expect(response.body.data[0].AISMessage_Id).toBe(24670)
    })
})
//test getting port by name

//test getting port by country?

//last 5 mmsi positions

//test get/insert queries with db.js

//sql injection?

//do we want a testing mode flag for functions to not query the database whatsoever?
