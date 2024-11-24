const request = require("supertest");
const express = require("express");
const asistenciaRouter = require("../routes/asistencia"); // Ajusta la ruta según tu estructura
const { asistencia, alumnos, fechas } = require("../models");

jest.mock("../models", () => ({
  asistencia: {
    findAll: jest.fn(),
  },
  alumnos: {},
  fechas: {},
}));

const app = express();
app.use(express.json());
app.use("/asistencia", asistenciaRouter);

beforeEach(() => {
  jest.clearAllMocks();
});
test("GET /asistencia debería devolver una lista de asistencias con datos relacionados", async () => {
    const mockAsistencias = [
      {
        id_asistencia: 1,
        asistencias: true,
        alumno: { nombre: "Carlos", apellido_1: "Lopez", apellido_2: "Martinez" },
        fecha: { fecha: "2024-11-20" },
      },
      {
        id_asistencia: 2,
        asistencias: false,
        alumno: { nombre: "Ana", apellido_1: "Perez", apellido_2: "Gomez" },
        fecha: { fecha: "2024-11-19" },
      },
    ];
  
    asistencia.findAll.mockResolvedValue(
      mockAsistencias.map((a) => ({
        id_asistencia: a.id_asistencia,
        asistencias: a.asistencias,
        alumno: a.alumno,
        fecha: a.fecha,
      }))
    );
  
    const response = await request(app).get("/asistencia");
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockAsistencias);
  
    expect(asistencia.findAll).toHaveBeenCalledWith({
      attributes: ["asistencias", "id_asistencia"],
      include: [
        {
          model: alumnos,
          attributes: ["nombre", "apellido_1", "apellido_2"],
        },
        {
          model: fechas,
          attributes: ["fecha"],
        },
      ],
      order: [
        [{ model: fechas }, "fecha", "ASC"],
        [{ model: alumnos }, "nombre", "ASC"],
      ],
    });
  });
  test("GET /asistencia debería manejar errores correctamente", async () => {
    asistencia.findAll.mockRejectedValue(new Error("Database error"));
  
    const response = await request(app).get("/asistencia");
  
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Hubo un problema al obtener los datos" });
    expect(asistencia.findAll).toHaveBeenCalled();
  });
    