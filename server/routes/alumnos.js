const express = require('express');
const router = express.Router()
const { alumnos } = require('../models');


router.get('/', async (req, res) =>{
    const listofalumnos = await alumnos.findAll();
    res.json(listofalumnos);
});

router.post("/", async (req, res) =>{
    const alumno = req.body;
    await alumnos.create(alumno)
    res.json(alumno);
});

router.delete("/:id_alumno", async (req, res) => {
    const id_alumno = req.params.id_alumno;
    await alumnos.destroy({
        where: {
            id_alumno: id_alumno,
        },
    });
    res.json({ message: "Alumno eliminado" });
});

module.exports = router;