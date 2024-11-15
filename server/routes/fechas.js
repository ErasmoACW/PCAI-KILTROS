const express = require('express');
const router = express.Router()
const { fechas } = require('../models');


router.get('/', async (req, res) =>{
    const listoffechas = await fechas.findAll();
    res.json(listoffechas);
});

module.exports = router;