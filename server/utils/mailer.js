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

async function sendEmail(datos) {
  try {
    
    // Consulta los datos del alumno desde la base de datos
    const alumno = await alumnos.findOne({
      where: { id_alumno: datos.id },  // Cambia esto según el criterio que necesites
      attributes: ['nombre','apellido_1','apellido_2','correo_ap','nombre_ap','apellido_ap'],  // Aquí puedes incluir más atributos si lo necesitas
    });

    // Obtener la hora actual en formato adecuado
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    console.log(currentTime);
    

    // Crear el contenido del correo
    const subject = 'Notificacion de Ingreso';
    const text = `Buenos dia Sr(a) ${datos.nombre_ap} ${datos.apellido_ap},\n\nSe le informa que su pupilo(a) ${datos.nombre} ${datos.apellido_1} ${datos.apellido_2}, ingreso al establecimiento a las: ${currentTime} horas`;

    // Configurar las opciones del correo
    const mailOptions = {
      from: 'kiltrosinc@gmail.com',  // Remitente
      to: datos.correo_ap,  // Destinatario
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
