const express = require('express');
const router = express.Router();
const { asistencia, alumnos, fechas } = require('../models');

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

module.exports = router;
