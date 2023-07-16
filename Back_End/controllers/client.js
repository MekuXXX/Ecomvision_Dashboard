const { asyncWrapper } = require('../middleware');
const { Products, ProductsStat, User, Transactions } = require('../models');
const { StatusCodes } = require('http-status-codes');
const getCountryISO3 = require('country-iso-2-to-3');
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

const getTransactions = asyncWrapper(async (req, res) => {
    let { page = 0, pageSize = 20, sort = null, search = '' } = req.query;
    const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
            [sortParsed.field]: sortParsed.sort === 'asc' ? 1 : -1,
        };
        return sortFormatted;
    };
    const sortFormatted = Boolean(sort) ? generateSort() : {};
    const transactions = await Transactions.find({
        $or: [
            { cost: { $regex: new RegExp(search, 'i') } },
            { userId: { $regex: new RegExp(search, 'i') } },
        ],
    })
        .sort(sortFormatted)
        .limit(pageSize)
        .skip(page * pageSize);
    const total = await Transactions.countDocuments({
        $or: [
            { cost: { $regex: new RegExp(search, 'i') } },
            { userId: { $regex: new RegExp(search, 'i') } },
        ],
    });
    res.status(StatusCodes.OK).json({ transactions, total });
});

const getGeography = asyncWrapper(async (req, res) => {
    const users = await User.find();
    const eachCountryMembers = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryISO3(country);
        if (!acc[countryISO3]) acc[countryISO3] = 0;
        acc[countryISO3]++;
        return acc;
    }, {});
    const formatterdMembers = Object.entries(eachCountryMembers).map(
        ([country, value]) => {
            return { id: country, value };
        }
    );
    res.status(StatusCodes.OK).json(formatterdMembers);
});

module.exports = { getProducts, getCustomers, getTransactions, getGeography };
