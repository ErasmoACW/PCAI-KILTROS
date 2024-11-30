const express = require("express");
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { sendEmail } = require('./utils/mailer');  // Importamos la función de envío de correo

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Importamos y usamos las rutas de alumnos, asistencia, admin, fechas
const db = require('./models');
const alumnosRouter = require("./routes/alumnos");
app.use("/alumnos", alumnosRouter);

const asistenciaRouter = require("./routes/asistencia");
app.use("/asistencia", asistenciaRouter);

const adminRouter = require("./routes/admin");
app.use("/admin", adminRouter);

const mailerRouter = require("./routes/mailer");
app.use("/mailer", mailerRouter)

const curso = require("./routes/curso");
app.use("/curso", curso)

// Ruta para enviar el correo
app.post('/api/send-test-email', async (req, res) => {
  try {
    const message = await sendEmail();  // Llamamos a la función para enviar el correo
    res.json({ message: 'Correo enviado correctamente: ' + message });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo' });
  }
});
  

db.sequelize.sync().then(() => { 
    app.listen(8800,()=>{
        console.log ("Conexion hecha")
    });
});

