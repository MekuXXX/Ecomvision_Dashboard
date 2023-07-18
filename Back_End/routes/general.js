const express = require('express');
const router = express.Router();
const { getUser, getDashboard } = require('../controllers');
router.route('/user/:id').get(getUser);
router.route('/dashboard').get(getDashboard);

module.exports = router;
