const express = require('express');
const router = express.Router()
const { asistencia } = require('../models');


router.get('/', async (req, res) =>{
    const listofasistencia = await asistencia.findAll();
    res.json(listofasistencia);
});

module.exports = router;