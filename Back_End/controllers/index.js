const { getHome } = require('./main');
const { getUser, getDashboard } = require('./general');
const { getSales } = require('./sales');
const { getAdmins, getUserPerformance } = require('./management');
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
    getSales,
    getAdmins,
    getUserPerformance,
    getDashboard,
};
