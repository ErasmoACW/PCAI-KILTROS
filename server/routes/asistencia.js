const express = require('express');
const router = express.Router();
const { asistencia, alumnos, fechas } = require('../models');
const { Op, literal } = require('sequelize');
const {getidfecha} = require('../utils/datosasistencia')

router.get('/', async (req, res) => {
  try {
    const listofasistencia = await asistencia.findAll({
      attributes: ['asistencias','id_asistencia'],
      include: [
        {
          model: alumnos,
          attributes: ['nombre', 'apellido_1', 'apellido_2'],
        },
        {
          model: fechas,
          attributes: ['fecha'],
        },
      ],
      order: [
        [{ model: fechas }, 'fecha', 'ASC'],
        [{ model: alumnos }, 'nombre', 'ASC'],
      ],
    });

    res.json(listofasistencia);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los datos' });
  }
});

router.get('/nombre/:NombreCompleto', async (req, res) => {
  try {
    const NombreCompleto = req.params.NombreCompleto;
    const NombreArray = NombreCompleto.split(' ');

    const targetMonth = parseInt(NombreArray[3], 10);

    const listofasistencia = await asistencia.findAll({
      attributes: ['asistencias','id_asistencia'],
      include: [
        {model: alumnos, attributes: ['id_alumno', 'nombre', 'apellido_1', 'apellido_2'], as: 'alumno'},
        {model: fechas, attributes: ['id_fecha', 'fecha'], as: 'fecha'},
      ],
      order: [
        [{ model: fechas, as: 'fecha' }, 'fecha', 'ASC'],
        [{ model: alumnos, as: 'alumno' }, 'nombre', 'ASC'],
      ],
      where: {
        '$alumno.nombre$': NombreArray[0],
        '$alumno.apellido_1$': NombreArray[1],
        '$alumno.apellido_2$': NombreArray[2],
        [Op.and]: literal(`MONTH(fecha.fecha) = ${targetMonth}`),
      },
    });

    res.json(listofasistencia);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    res.status(500).json({ error: 'Hubo un problema al obtener los datos' });
  }
});

router.put("/:id_alumno", async (req, res) => {
  const inputData = req.body;
  const idAlumno = inputData[0]?.alumno?.id_alumno;

  try {
    // Loop through inputData to update each asistencia entry
    const updatePromises = inputData.map(async (entry) => {
      const { id_asistencia, asistencias } = entry;

      // Update the record in the database
      return asistencia.update(
        { asistencias }, // Values to update
        { where: { id_asistencia, id_alumno: idAlumno,},}
        );
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    res.status(200).json({ message: `Asistencias updated successfully for id_alumno: ${idAlumno}` });
  } catch (error) {
    console.error('Error updating asistencias:', error);
    res.status(500).json({ error: 'An error occurred while updating asistencias' });
  }
});


//Insertar mediante qr
router.post("/add_asistencia", async (req, res) => {
  try {
    // Extraer id_alumno del req.body
    const { id_alumno } = req.body;
    if (!id_alumno) {
      return res.status(400).json({ error: "El campo 'id_alumno' es obligatorio." });
    }

    // Obtener la fecha actual en formato 'sv-SE'
    const today = new Date();
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = today.toLocaleDateString('sv-SE', options);

    // Obtener id_fecha usando una función externa
    const id_fecha = await getidfecha(formattedDate);

    // Construir el objeto para insertar en asistencia
    const nuevoRegistro = {
      id_alumno,
      id_fecha,
      asistencias: 1, // Entero que representa 1
    };

    // Guardar el registro en la base de datos
    await asistencia.create(nuevoRegistro);

    // Responder con el objeto creado o con un mensaje de éxito
    res.json({data: nuevoRegistro });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la asistencia" });
  }
});


module.exports = router;
