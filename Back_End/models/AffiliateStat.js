const mongoose = require('mongoose');

const AffiliateStatSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Types.ObjectId, ref: 'User' },
        affiliateSales: {
            type: [mongoose.Types.ObjectId],
            ref: 'transactions',
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('affiliateStates', AffiliateStatSchema);
