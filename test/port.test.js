const request = require("supertest");
const app = require("../src/app");

//test getting port by name
describe ("Test Getting port by name", () => {
    test("Should get the port", async () => {
        const response = await request(app).get('/port?port=Nyborg')
        expect(response.body.data[0].Name).toBe('Nyborg')
    })
})

//test getting port by country?
describe ("Test Getting port by country", () => {
    test("Should get the port", async () => {
        const response = await request(app).get('/port?port=Nyborg&country=Denmark')
        expect(response.body.data[0].Name).toBe('Nyborg')
    })
})

describe("Test invalid port name", () => {
    test("Should get no port", async () => {
        const response = await request(app).get('/port?port=invalid')
        expect(response.body.data.length).toBe(0)
    })
})

describe("Test invalid country but not invalid port name", () => {
    test("Should get no port", async () => {
        const response = await request(app).get('/port?port=Nyborg&country=invalid')
        expect(response.body.data.length).toBe(0)
    })
})