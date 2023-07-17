const express = require('express');
const { getAdmins } = require('../controllers');
const router = express.Router();
router.route('admins', getAdmins);
module.exports = router;
