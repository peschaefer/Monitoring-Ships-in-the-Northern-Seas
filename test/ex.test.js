const request = require("supertest")
const app = require("../src/app")

describe("Test Getting A Vessel", () => {
    test("Should have vessel data", async () => {
        const response = await request(app).get("/vessel?MMSI=235095435")
        expect(response.body.data[0].IMO).toBe(1000019)
    })
})