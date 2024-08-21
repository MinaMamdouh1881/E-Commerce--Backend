const express = require('express');
const router = express.Router();

const { signUpHandler } = require('../controllers/sing_up');

router.route('/').post(signUpHandler);

module.exports = router;
