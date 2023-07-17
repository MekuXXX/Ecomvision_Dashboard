const { asyncWrapper } = require('../middleware');
const { User } = require('../models');

const getAdmins = asyncWrapper((req, res) => {});

module.exports = {
    getAdmins,
};
