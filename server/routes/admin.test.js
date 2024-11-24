const request = require("supertest");
const express = require("express");
const adminRouter = require("../routes/admin"); // Ajusta la ruta según tu estructura
const { admin } = require("../models"); // Mock del modelo

jest.mock("../models", () => ({
  admin: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.use("/admin", adminRouter);

beforeEach(() => {
  jest.clearAllMocks();
});

test("GET /admin debería devolver la lista de administradores", async () => {
    admin.findAll.mockResolvedValue([{ id: 1, usuario: "admin" }]);
  
    const response = await request(app).get("/admin");
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual([{ id: 1, usuario: "admin" }]);
    expect(admin.findAll).toHaveBeenCalledTimes(1);
  });
  test("GET /admin/:id_admin debería devolver un administrador por ID", async () => {
    admin.findByPk.mockResolvedValue({ id: 1, usuario: "admin" });
  
    const response = await request(app).get("/admin/1");
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, usuario: "admin" });
    expect(admin.findByPk).toHaveBeenCalledWith("1");
  });
  test("POST /admin/insert debería crear un nuevo administrador", async () => {
    const newAdmin = { usuario: "admin", contrasena: "1234" };
    admin.create.mockResolvedValue(newAdmin);
  
    const response = await request(app).post("/admin/insert").send(newAdmin);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual(newAdmin);
    expect(admin.create).toHaveBeenCalledWith(newAdmin);
  });
  test("PUT /admin/:id_admin debería actualizar un administrador", async () => {
    const updatedAdmin = { id_admin: 1, usuario: "admin", contrasena: "12345" };
    admin.update.mockResolvedValue([1]); // Mock de filas afectadas
  
    const response = await request(app).put("/admin/1").send(updatedAdmin);
  
    expect(response.status).toBe(200); // Ajusta según la implementación
    expect(admin.update).toHaveBeenCalledWith(
      updatedAdmin,
      { where: { id_admin: "1" } }
    );
  });
  test("DELETE /admin/:id_admin debería eliminar un administrador", async () => {
    admin.destroy.mockResolvedValue(1); // Mock de filas afectadas
  
    const response = await request(app).delete("/admin/1");
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Admin eliminado" });
    expect(admin.destroy).toHaveBeenCalledWith({ where: { id_admin: "1" } });
  });
  test("POST /admin debería autenticar correctamente a un administrador", async () => {
    const credentials = { username: "admin", password: "1234" };
    admin.findOne.mockResolvedValue({ id: 1, usuario: "admin", contrasena: "1234" });
  
    const response = await request(app).post("/admin").send(credentials);
  
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ success: true });
    expect(admin.findOne).toHaveBeenCalledWith({ where: { usuario: "admin" } });
  });
  
  test("POST /admin debería fallar si el usuario no existe", async () => {
    const credentials = { username: "admin", password: "1234" };
    admin.findOne.mockResolvedValue(null);
  
    const response = await request(app).post("/admin").send(credentials);
  
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ success: false, message: "Usuario no encontrado" });
  });
  
  test("POST /admin debería fallar si la contraseña es incorrecta", async () => {
    const credentials = { username: "admin", password: "wrongpassword" };
    admin.findOne.mockResolvedValue({ id: 1, usuario: "admin", contrasena: "1234" });
  
    const response = await request(app).post("/admin").send(credentials);
  
    expect(response.status).toBe(401);
    expect(response.body).toEqual({ success: false, message: "Contraseña incorrecta" });
  });
            