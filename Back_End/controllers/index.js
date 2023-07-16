const { getHome } = require('./main');
const { getUser } = require('./general');
const {
    getProducts,
    getCustomers,
    getTransactions,
    getGeography,
} = require('./client');
module.exports = {
    getHome,
    getUser,
    getProducts,
    getCustomers,
    getTransactions,
    getGeography,
};
