const express = require('express');
const router = express.Router()
const { admin } = require('../models');

router.get('/', async (req, res) =>{
    const listofadmin = await admin.findAll();
    res.json(listofadmin);
});

router.get("/:id_admin", async (req, res) => {
    const id_admin = req.params.id_admin;
    const Admin = await admin.findByPk(id_admin);
    res.json(Admin);
});

router.post("/insert", async (req, res) =>{
    const admins = req.body;
    await admin.create(admins)
    res.json(admins);
});

router.put("/:id_admin", async (req, res) => {
    const id_admin = req.params.id_admin;
    const admins = req.body
    await admin.update({id_admin: admins.id_admin, usuario: admins.usuario, contrasena: admins.contrasena},{where: {id_admin: id_admin,},},);
});

router.delete("/:id_admin", async (req, res) => {
    const id_admin = req.params.id_admin;
    await admin.destroy({
        where: {
            id_admin: id_admin,
        },
    });
    res.json({ message: "Admin eliminado" });
});

module.exports = router;


 router.post('/', async (req, res) => {
     const { username, password } = req.body;

     try {
         // Buscar al administrador por el nombre de usuario
         const user = await admin.findOne({ where: { usuario: username } });

         if (!user) {
             return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
         }

         // Comparar la contraseña (ajusta si usas encriptación)
         if (user.contrasena !== password) {
             return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
         }

         // Respuesta exitosa
        res.json({ success: true });
    } catch (error) {
         console.error('Error en la autenticación:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
     }
 });

 const jwt = require('jsonwebtoken'); // Instalar con: npm install jsonwebtoken

router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await admin.findOne({ where: { usuario: username } });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
        }

        if (user.contrasena !== password) {
            return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
        }

        // Crear un token simple
        const token = jwt.sign({ id: user.id_admin, username: user.usuario }, 'clave_secreta', { expiresIn: '1h' });

        res.json({ success: true, token });
    } catch (error) {
        console.error('Error en la autenticación:', error);
        res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

 module.exports = router;
