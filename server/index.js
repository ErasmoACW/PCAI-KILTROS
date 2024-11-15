const express = require("express");
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const db = require('./models')

//Routers
const alumnosRouter = require("./routes/alumnos")
app.use("/alumnos", alumnosRouter)

const asistenciaRouter = require("./routes/asistencia")
app.use("/asistencia", asistenciaRouter)

const adminRouter = require("./routes/admin")
app.use("/admin", adminRouter)

const fechasRouter = require("./routes/fechas")
app.use("/fechas", fechasRouter)

db.sequelize.sync().then(() => { 
    app.listen(8800,()=>{
        console.log ("Conexion hecha")
    });
});

