const mongoose = require('mongoose');

const OverallStatSchema = new mongoose.Schema(
    {
        tatalCustomers: Number,
        yearlySalesTotal: Number,
        yearlyTotalSoldUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: String,

                totalSales: Number,

                totalUnits: Number,
            },
        ],
        dailyData: [
            {
                date: String,
                totalSales: Number,
                totalUnits: Number,
            },
        ],
        salesByCategory: {
            type: Map,
            of: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('overallstats', OverallStatSchema);