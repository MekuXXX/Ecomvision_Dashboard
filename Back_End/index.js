require('dotenv').config();
// Variables
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./db/connectDB');
const { notFound, errorHandler } = require('./middleware');
const {
    clientRouter,
    generalRouter,
    mainRouter,
    managementRouter,
    salesRouter,
} = require('./routes');
const app = express();
const PORT = process.env.PORT || 3002;
// Middlewares
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/', mainRouter);
app.use('/client', clientRouter);
app.use('/general', generalRouter);
app.use('/management', managementRouter);
app.use('/sales', salesRouter);
app.use(notFound);
app.use(errorHandler);

// Start server
const startServer = async URI => {
    try {
        await connectDB(URI);
        app.listen(PORT, () => {
            console.log(`The server is running at port ${PORT}...`);
        });
    } catch (err) {
        console.log(`There wase error in starting server: ${err}`);
    }
};

startServer(process.env.MONGO_URI);
