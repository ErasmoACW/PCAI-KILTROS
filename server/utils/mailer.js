// utils/mailer.js
const nodemailer = require('nodemailer');
const { alumnos } = require('../models');  // Importa el modelo de alumnos

// Configurar el transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kiltrosinc@gmail.com',  // Cambia esto por tu correo de Gmail
    pass: 'iqae canj ywqc rdqd',  // Usa una contraseña de aplicación para mayor seguridad
  },
});

async function sendEmail() {
  try {
    // Consulta los datos del alumno desde la base de datos
    const alumno = await alumnos.findOne({
      where: { id_alumno: 6 },  // Cambia esto según el criterio que necesites
      attributes: ['nombre'],  // Aquí puedes incluir más atributos si lo necesitas
    });

    // Obtener la hora actual en formato adecuado
    const currentTime = new Date().toLocaleString();

    // Crear el contenido del correo
    const subject = 'Correo de prueba con datos';
    const text = `Hola ${alumno.nombre},\n\nEste es un correo de prueba.\nCorreo enviado a las: ${currentTime}`;

    // Configurar las opciones del correo
    const mailOptions = {
      from: 'kiltrosinc@gmail.com',  // Remitente
      to: 'nicolas.navarro@alu.ucm.cl',  // Destinatario
      subject: subject,
      text: text,  // El cuerpo del correo incluye los datos obtenidos
    };

    // Enviar el correo
    const info = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado: ${info.response}`);
    return info.response;  // Devuelve la respuesta de envío
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('Error al enviar el correo');
  }
}

module.exports = { sendEmail };
