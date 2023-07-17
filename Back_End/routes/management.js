const express = require('express');
const router = express.Router();
const { getAdmins, getUserPerformance } = require('../controllers');
router.route('/admins').get(getAdmins);
router.route('/performance/:id').get(getUserPerformance);
module.exports = router;
