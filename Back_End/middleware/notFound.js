const express = require('express');
const router = express.Router();

router.route('*').get((req, res) => {
    return res.status(404).json({ msg: 'Page not found' });
});

module.exports = router;
