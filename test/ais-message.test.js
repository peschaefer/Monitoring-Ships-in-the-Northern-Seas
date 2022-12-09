const request = require("supertest");
const app = require("../src/app");
const validAISBatchJson = require("./json/validAisBatch.json");
const invalidAISBatchJson = require("./json/invalidAisBatch.json");
const validPositionReportJson = require("./json/validPositionReport.json");
const validStaticDataJson = require("./json/validStaticData.json");
//delete old ais messages
describe("Test Deleting old AIS messages", () => {
    test("Should have deleted 0 or more rows", async () => {
        const response = await request(app).get('/ais-message/delete')
        expect(response.body.deleted).toBeGreaterThanOrEqual(0)
    })
})
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
describe("Test Posting AIS Message, position report with no batch", () => {
    test("Should have 1 inserted row", async () => {
        const response = await request(app).post('/ais-message').send(validPositionReportJson)
        expect(response.body.insertedRows).toBe(1)
    })
})

//insert AIS Message, static data with no batch
describe("Test Posting AIS Message, static data with no batch", () => {
    test("Should have 1 inserted row", async () => {
        const response = await request(app).post('/ais-message').send(validStaticDataJson)
        expect(response.body.insertedRows).toBe(1)
    })
})

//test getting port by name

//test getting port by country?

//test get/insert queries with db.js

//sql injection?

