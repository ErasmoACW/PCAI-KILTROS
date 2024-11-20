const express = require('express');
const router = express.Router()
const { admin } = require('../models');

router.get('/', async (req, res) =>{
    const listofadmin = await admin.findAll();
    res.json(listofadmin);
});

module.exports = router;

// Ruta para autenticar usuario
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

module.exports = router;
