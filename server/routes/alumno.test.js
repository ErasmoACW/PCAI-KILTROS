const request = require("supertest");
const express = require("express");
const alumnosRouter = require("../routes/alumnos"); // Asegúrate de que la ruta sea correcta
const { alumnos } = require("../models"); // Mockear este modelo

// Mockear los métodos del modelo 'alumnos'
jest.mock("../models", () => ({
  alumnos: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

// Configurar la app de Express para las pruebas
const app = express();
app.use(express.json());
app.use("/alumnos", alumnosRouter);

describe("Prueba inicial", () => {
    test("Debería pasar correctamente", () => {
      expect(1).toBe(1);
    });
  });

describe("Rutas de Alumnos", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Limpiar los mocks antes de cada prueba
  });

  test("GET /alumnos debería devolver la lista de alumnos", async () => {
    // Mockear la respuesta de 'findAll'
    alumnos.findAll.mockResolvedValue([{ id: 1, nombre: "Juan" }]);

    const response = await request(app).get("/alumnos");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, nombre: "Juan" }]);
    expect(alumnos.findAll).toHaveBeenCalledTimes(1);
  });

  test("GET /alumnos/:id_alumno debería devolver un alumno por ID", async () => {
    alumnos.findByPk.mockResolvedValue({ id: 1, nombre: "Juan" });

    const response = await request(app).get("/alumnos/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, nombre: "Juan" });
    expect(alumnos.findByPk).toHaveBeenCalledWith("1");
  });

  test("POST /alumnos debería crear un nuevo alumno", async () => {
    const newAlumno = { nombre: "Ana", apellido_1: "Perez", apellido_2: "Lopez" };
    alumnos.create.mockResolvedValue(newAlumno);

    const response = await request(app).post("/alumnos").send(newAlumno);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(newAlumno);
    expect(alumnos.create).toHaveBeenCalledWith(newAlumno);
  });

  test("PUT /alumnos/:id_alumno debería actualizar un alumno", async () => {
    alumnos.update.mockResolvedValue([1]); // Sequelize devuelve el número de filas afectadas

    const updatedAlumno = { id_alumno: 1, nombre: "Carlos", apellido_1: "Lopez", apellido_2: "Martinez" };
    const response = await request(app).put("/alumnos/1").send(updatedAlumno);

    expect(response.status).toBe(200); // Puedes ajustarlo según lo que devuelva tu implementación
    expect(alumnos.update).toHaveBeenCalledWith(
      { id_alumno: 1, nombre: "Carlos", apellido_1: "Lopez", apellido_2: "Martinez" },
      { where: { id_alumno: "1" } }
    );
  });

  test("DELETE /alumnos/:id_alumno debería eliminar un alumno", async () => {
    alumnos.destroy.mockResolvedValue(1); // Sequelize devuelve el número de filas afectadas

    const response = await request(app).delete("/alumnos/1");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Alumno eliminado" });
    expect(alumnos.destroy).toHaveBeenCalledWith({ where: { id_alumno: "1" } });
  });
});
