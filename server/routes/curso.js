const express = require('express');
const router = express.Router()
const { curso } = require('../models');


router.get('/', async (req, res) =>{
    const cursos = await curso.findAll();
    res.json(cursos);
});

router.post("/", async (req, res) =>{
    const cursos = req.body;
    await curso.create(cursos)
    res.json(curso);
});

module.exports = router;