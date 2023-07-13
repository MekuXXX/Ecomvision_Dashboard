const { asyncWrapper } = require('../middleware');
const { Products, ProductsStat, User } = require('../models');
const { StatusCodes } = require('http-status-codes');

const getProducts = asyncWrapper(async (req, res) => {
    const products = await Products.find();
    const productsWithStats = await Promise.all(
        products.map(async (product) => {
            const stat = await ProductsStat.find({ productId: product._id });
            return { ...product._doc, stat };
        })
    );
    res.status(StatusCodes.OK).json(productsWithStats);
});

const getCustomers = asyncWrapper(async (req, res) => {
    const customers = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json(customers);
});

module.exports = { getProducts, getCustomers };
