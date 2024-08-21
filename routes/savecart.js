const express = require('express');
const router = express.Router();

const { savecart } = require('../controllers/savecart');
router.put('/', savecart);

module.exports = router;
