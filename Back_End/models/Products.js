const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide product name'],
        },
        price: {
            type: Number,
            required: [true, 'Please provide price'],
        },
        description: {
            type: String,
            required: [true, 'Please provide a description'],
        },
        category: {
            type: String,
            required: [true, 'Please provide a category'],
        },
        rating: {
            type: Number,
            required: [true, 'Please provide product rate'],
        },
        supply: {
            type: Number,
            required: [true, 'Please provide a supply'],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('products', ProductSchema);
