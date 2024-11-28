// routes/email.js
const express = require('express');
const router = express.Router();
const { sendEmail } = require('../utils/mailer');

// Ruta para enviar el correo
router.post('/send-test-email', async (req, res) => {
  try {
    const message = await sendEmail();  // Llamamos a la función sendEmail para enviar el correo
    res.json({ message: 'Correo enviado correctamente: ' + message });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
});

module.exports = router;
