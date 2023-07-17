require('dotenv').config();
// Variables
const express = require('express');
const connectDB = require('./db/connectDB');
const app = express();
const PORT = process.env.PORT || 3002;
const {
    User,
    Products,
    ProductsStat,
    Transactions,
    OverallStat,
} = require('./models');
const {
    dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
} = require('./data');

// Start server
const startServer = async URI => {
    try {
        await connectDB(URI);
        await app.listen(PORT, () => {
            console.log(`The server is running at port ${PORT}...`);
        });

        User.insertMany(dataUser);
        Products.insertMany(dataProduct);
        ProductsStat.insertMany(dataProductStat);
        Transactions.insertMany(dataTransaction);
        OverallStat.insertMany(dataOverallStat);
    } catch (err) {
        console.log(`There wase error in starting server`);
    }
};

startServer(process.env.MONGO_URI);
