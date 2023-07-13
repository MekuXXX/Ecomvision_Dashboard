const express = require('express');
const router = express.Router();
const { getUser } = require('../controllers');
router.route('/user/:id').get(getUser);

module.exports = router;
