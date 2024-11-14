const express = require('express');
const router = express.Router()
const { alumnos } = require('../models');


router.get('/', async (req, res) =>{
    const listofalumnos = await alumnos.findAll();
    res.json(listofalumnos);
});


module.exports = router;