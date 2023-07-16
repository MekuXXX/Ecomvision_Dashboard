const mongoose = require('mongoose');

const ProductStatSchema = new mongoose.Schema(
    {
        productId: {
            type: String,
            required: [true, 'Please provide product id'],
        },
        yaerlySalesTotal: Number,
        yaerlyTotalSolidUnits: Number,
        year: Number,
        monthlyData: [
            {
                month: {
                    type: String,
                    required: [true, 'Please provide the month'],
                },
                totalSales: {
                    type: Number,
                    required: [true, 'Please provide total monthly sales'],
                },
                totalUnits: {
                    type: Number,
                    required: [true, 'Please provide total units'],
                },
            },
        ],
        dailyDate: {
            data: String,
            totalSales: Number,
            totalUnits: Number,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('products_stat', ProductStatSchema);
