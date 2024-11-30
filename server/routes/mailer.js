// routes/email.js
const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/mailer');

// Ruta para enviar el correo
router.get('/test', (req,res)=>{
  res.json('test from endpoint')
})

router.post('/send-test-email', async (req, res) => {
  try {
    const datos = req.body
    if (!datos.id_alumno || !datos.nombre || !datos.apellido_1 || !datos.apellido_2 || !datos.correo_ap) {
      return res.status(400).json({ message: 'Faltan datos requeridos ' });
    }
    console.log("miau")
    console.log(datos)
    const message = await sendEmail(datos);  // Llamamos a la función sendEmail para enviar el correo
    res.json({ message: 'Correo enviado correctamente: ' + message });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
});

module.exports = router;
