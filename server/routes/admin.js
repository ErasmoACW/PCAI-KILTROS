const express = require('express');
const router = express.Router()
const { admin } = require('../models');

router.get('/', async (req, res) =>{
    const listofadmin = await admin.findAll();
    res.json(listofadmin);
});

module.exports = router;