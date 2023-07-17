const { default: mongoose } = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const { asyncWrapper } = require('../middleware');
const { User, Transactions } = require('../models');

const getAdmins = asyncWrapper(async (req, res) => {
    const admins = await User.find({ role: 'admin' }).select('-password');
    res.status(StatusCodes.OK).json(admins);
});

const getUserPerformance = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const userWithStats = await User.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
            $lookup: {
                from: 'affiliatestates',
                localField: '_id',
                foreignField: 'userId',
                as: 'affiliateStates',
            },
        },
        { $unwind: '$affiliateStates' },
    ]);
    const saleTransactions = await Promise.all(
        userWithStats[0].affiliateStates.affiliateSales.map(id => {
            return Transactions.findById(id);
        }),
    );
    const filteredSaleTransactions = saleTransactions.filter(
        transaction => transaction !== null,
    );

    res.status(200).json({
        user: userWithStats[0],
        sales: filteredSaleTransactions,
    });
});

module.exports = {
    getAdmins,
    getUserPerformance,
};
