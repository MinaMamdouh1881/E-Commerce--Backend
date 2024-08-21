const express = require('express');
const router = express.Router();
const { getDataByCategory } = require('../controllers/categories');

router.route('/:cat').get(getDataByCategory);

module.exports = router;
