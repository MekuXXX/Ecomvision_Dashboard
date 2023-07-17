const express = require('express');
const router = express.Router();
const { getSales } = require('../controllers');

router.route('/').get(getSales);
module.exports = router;
