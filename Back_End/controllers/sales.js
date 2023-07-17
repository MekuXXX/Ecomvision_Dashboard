const { asyncWrapper } = require('../middleware/index');
const { OverallStat } = require('../models');
const { StatusCodes } = require('http-status-codes');
const getSales = asyncWrapper(async (req, res) => {
    const overallStats = await OverallStat.find();
    res.status(StatusCodes.OK).json(overallStats[0]);
});

module.exports = {
    getSales,
};
