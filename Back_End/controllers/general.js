const { StatusCodes } = require('http-status-codes');
const { asyncWrapper } = require('../middleware');
const { User, OverallStat, Transactions } = require('../models');
const getUser = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(StatusCodes.OK).json({ user });
});
const getDashboard = asyncWrapper(async (req, res) => {
    const cuurentMonth = 'November';
    const currentYear = 2021;
    const currentDay = '2021-11-15';

    const transactions = await Transactions.find()
        .limit(50)
        .sort({ createdOn: -1 });
    const overallStats = await OverallStat.find({ year: currentYear });
    const {
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
    } = overallStats[0];
    const thisMonthStats = overallStats[0].monthlyData.find(({ month }) => {
        return month === cuurentMonth;
    });
    const todayStats = overallStats[0].dailyData.find(({ date }) => {
        return date === currentDay;
    });
    res.status(StatusCodes.OK).json({
        totalCustomers,
        yearlyTotalSoldUnits,
        yearlySalesTotal,
        monthlyData,
        salesByCategory,
        thisMonthStats,
        todayStats,
        transactions,
    });
});

module.exports = { getUser, getDashboard };
