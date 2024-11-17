const express = require('express');
const router = express.Router()
const { alumnos } = require('../models');


router.get('/', async (req, res) =>{
    const listofalumnos = await alumnos.findAll();
    res.json(listofalumnos);
});

router.get("/:id_alumno", async (req, res) => {
    const id_alumno = req.params.id_alumno;
    const Alumnos = await alumnos.findByPk(id_alumno);
    res.json(Alumnos);
});

router.post("/", async (req, res) =>{
    const alumno = req.body;
    await alumnos.create(alumno)
    res.json(alumno);
});

router.put("/:id_alumno", async (req, res) => {
    const id_alumno = req.params.id_alumno;
    const alumno = req.body
    await alumnos.update({id_alumno: alumno.id_alumno, nombre: alumno.nombre, apellido_1: alumno.apellido_1, apellido_2: alumno.apellido_2},{where: {id_alumno: id_alumno,},},);
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