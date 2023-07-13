const { getHome } = require('./main');
const { getUser } = require('./general');
const { getProducts, getCustomers } = require('./client');
module.exports = { getHome, getUser, getProducts, getCustomers };
