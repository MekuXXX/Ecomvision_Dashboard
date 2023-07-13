const { asyncWrapper } = require('../middleware');
const { Products, ProductsStat } = require('../models');
const getProducts = asyncWrapper(async (req, res) => {
    const products = await Products.find();
    const productsWithStats = await Promise.all(
        products.map(async (product) => {
            const stat = await ProductsStat.find({ productId: product._id });
            return { ...product._doc, stat };
        })
    );
    res.status(200).json(productsWithStats);
});

module.exports = { getProducts };
