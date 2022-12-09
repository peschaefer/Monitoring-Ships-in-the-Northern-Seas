const request = require("supertest");
const app = require("../src/app");

//get most recent position from mmsi
describe("Test Getting most recent position from mmsi", () => {
    test("Should get the test position report", async () => {
        const response = await request(app).get('/position-reports/recent?MMSI=0')
        expect(response.body.data[0].AISMessage_Id).toBe(24670)
    })
})

//last 5 mmsi positions


describe("Test Getting A Vessel", () => {
    test("Should have vessel data", async () => {
        const response = await request(app).get("/vessel?MMSI=235095435")
        expect(response.body.data[0].IMO).toBe(1000019)
    })
})