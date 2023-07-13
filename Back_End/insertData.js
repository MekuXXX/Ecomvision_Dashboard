require('dotenv').config();
// Variables
const express = require('express');
const connectDB = require('./db/connectDB');
const app = express();
const PORT = process.env.PORT || 3002;
const { User, Products, ProductsStat } = require('./models');
const { dataUser, dataProduct, dataProductStat } = require('./data');

app.get('/', (req, res) => {
    res.json(dataProductStat[0]);
});
// Start server
const startServer = async (URI) => {
    try {
        await connectDB(URI);
        await app.listen(PORT, () => {
            console.log(`The server is running at port ${PORT}...`);
        });

        User.insertMany(dataUser);
        Products.insertMany(dataProduct);
        ProductsStat.insertMany(dataProductStat);
    } catch (err) {
        console.log(`There wase error in starting server`);
    }
};

startServer(process.env.MONGO_URI);
