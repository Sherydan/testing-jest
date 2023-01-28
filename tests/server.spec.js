const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    describe("GET /cafes", () => {
        it("GET /cafes devuelve un status code 200 ", async () => {
            const response = await request(server).get("/cafes");
            expect(response.status).toBe(200);
        });

        it("GET /cafes el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
            const response = await request(server).get("/cafes");
            expect(Array.isArray(response.body)).toBeTruthy();
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("DELETE /cafes", () => {
        const jwt = "token";
        const idCafeAEliminar = 5;
        it("DELETE /cafes/:id duevuelve un código 404 al intentar eliminar un café con un id que no existe", async () => {
            const response = await request(server).delete(`/cafes/${idCafeAEliminar}`).set("Authorization", jwt).send();
            expect(response.status).toBe(404);
        });
    });

    describe("POST /cafes", () => {
        it("POST /cafes Agrega un nuevo cafe y devuelve un código 201", async () => {
            const cafe = {
                id: 6,
                nombre: "Cafe 6",
            };
            const response = await request(server).post("/cafes").send(cafe);
            expect(response.status).toBe(201);
        });

    });

    describe("PUT /cafes", () => {
        it("PUT /cafes Obtiene un status code 400 si el id en los parametros es distinto al del payload", async () => {
            const id = 7;
            const cafe = {
                id: 6,
                nombre: "Cafe 6",
            };
            const response = await request(server).put(`/cafes/${id}`).send(cafe);
            expect(response.status).toBe(400);
        });

    });
});
